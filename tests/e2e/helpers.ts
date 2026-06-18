import { expect, type Page } from '@playwright/test';

export interface StepData {
  kind: 'type' | 'info' | 'quiz' | 'predict' | 'fix' | 'challenge';
  solution: string;
  referenceSolution: string;
  expectedOutput: string;
  choices: { correct: boolean }[];
}

/** Lee el payload embebido del editor-tutor (incluye soluciones y opciones). */
export async function readPayload(page: Page): Promise<{ steps: StepData[] }> {
  const txt = await page.locator('[data-ct-data]').first().textContent();
  if (!txt) throw new Error('payload del tutor no encontrado');
  return JSON.parse(txt);
}

/** Resuelve un paso según su tipo, usando los datos del payload. */
async function solveStep(page: Page, step: StepData, index: number): Promise<void> {
  const primary = page.locator('[data-ct-primary]');
  // Esperar a que el motor esté en este paso.
  await expect(page.locator('[data-ct-step-num]')).toHaveText(String(index + 1));

  const choices = step.choices || [];
  if (step.kind === 'type') {
    const input = page.locator('[data-ct-input]');
    await expect(input).toBeEnabled();
    await input.fill(step.solution);
    await primary.click();
  } else if (step.kind === 'fix' || step.kind === 'challenge') {
    const free = page.locator('[data-ct-free-input]');
    await expect(free).toBeVisible();
    await free.fill(step.referenceSolution || step.solution || '');
    await primary.click();
  } else if (choices.length) {
    // quiz o predecir con opciones
    const correct = Math.max(0, choices.findIndex((c) => c.correct));
    const choiceEls = page.locator('.ct-choice');
    await expect(choiceEls.first()).toBeEnabled();
    await choiceEls.nth(correct).click();
    await expect(primary).toBeEnabled();
    await primary.click();
  } else if (step.kind === 'predict') {
    const pin = page.locator('[data-ct-predict-input]');
    await expect(pin).toBeVisible();
    await pin.fill(step.expectedOutput || '');
    await primary.click();
  } else if (step.kind === 'info') {
    await expect(primary).toBeEnabled();
    await primary.click();
  } else {
    throw new Error('tipo de paso desconocido: ' + step.kind);
  }
}

/** Juega una lección completa y verifica que llega al estado "completada". */
export async function playLesson(page: Page, courseSlug: string, lessonSlug: string): Promise<void> {
  await page.goto(`/${courseSlug}/${lessonSlug}`);
  const payload = await readPayload(page);
  expect(payload.steps.length).toBeGreaterThan(0);
  for (let i = 0; i < payload.steps.length; i++) {
    await solveStep(page, payload.steps[i], i);
  }
  await expect(page.locator('[data-ct-done]')).toBeVisible({ timeout: 40_000 });
  await expect(page.locator('.ct-done-title')).toHaveText('¡Lección completada!');
}
