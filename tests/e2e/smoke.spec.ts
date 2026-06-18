import { test, expect } from '@playwright/test';

test('el buscador está oculto por defecto y se abre con el botón', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-cmdk]')).toBeHidden();
  await page.locator('[data-cmdk-open]').first().click();
  await expect(page.locator('[data-cmdk]')).toBeVisible();
  await page.locator('[data-cmdk-input]').fill('python');
  await expect(page.locator('.cmdk-item').first()).toBeVisible();
});

test('lección conceptual NO muestra el editor/IDE', async ({ page }) => {
  await page.goto('/ia/la-nueva-forma');
  await expect(page.locator('[data-ct-step-num]')).toHaveText('1');
  await expect(page.locator('[data-ct-editor]')).toBeHidden();
});

test('lección de código SÍ muestra el editor/IDE', async ({ page }) => {
  await page.goto('/javascript/hola-mundo');
  await expect(page.locator('[data-ct-editor]')).toBeVisible();
});

test('el playground ejecuta JavaScript', async ({ page }) => {
  await page.goto('/playground');
  await page.locator('[data-pl-run]').click();
  await expect(page.locator('[data-pl-out]')).toContainText('Hola, Ada!');
});

test('la home no muestra overlays sueltos', async ({ page }) => {
  await page.goto('/');
  // El cartel de "lección completada" no debe existir acá
  await expect(page.locator('[data-ct-done]')).toHaveCount(0);
});
