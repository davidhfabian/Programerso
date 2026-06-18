import { test, expect } from '@playwright/test';
import { playLesson } from './helpers';

test('registro → sesión → progreso por cuenta → logout → login', async ({ page }) => {
  const ts = Date.now();
  const emailA = `ada-${ts}@test.com`;

  // Registro de la cuenta A
  await page.goto('/registro');
  await page.fill('[data-reg-name]', 'Ada Lovelace');
  await page.fill('[data-reg-email]', emailA);
  await page.fill('[data-reg-pass]', 'secret123');
  await page.click('[data-reg-submit]');
  await page.waitForURL('**/progreso');
  await expect(page.locator('[data-pg-greeting]')).toContainText('Ada');
  // El control de cuenta del header ahora apunta al perfil (logueado)
  await expect(page.locator('[data-account]')).toHaveAttribute('href', '/perfil');

  // Jugar una lección suma 1 al avance de ESTA cuenta
  await playLesson(page, 'ia', 'la-nueva-forma');
  await page.goto('/progreso');
  await expect(page.locator('[data-pg-lessons]')).toHaveText('1');

  // Cerrar sesión
  await page.goto('/perfil');
  await page.click('[data-pf-logout]');
  await page.waitForURL('http://localhost:4173/');

  // Cuenta B: progreso separado (0 lecciones)
  const emailB = `linus-${ts}@test.com`;
  await page.goto('/registro');
  await page.fill('[data-reg-name]', 'Linus');
  await page.fill('[data-reg-email]', emailB);
  await page.fill('[data-reg-pass]', 'secret123');
  await page.uncheck('[data-reg-migrate]');
  await page.click('[data-reg-submit]');
  await page.waitForURL('**/progreso');
  await expect(page.locator('[data-pg-lessons]')).toHaveText('0');

  // Volver a la cuenta A: recupera su avance
  await page.goto('/entrar');
  await page.fill('[data-login-email]', emailA);
  await page.fill('[data-login-pass]', 'secret123');
  await page.click('[data-login-submit]');
  await page.waitForURL('**/progreso');
  await expect(page.locator('[data-pg-lessons]')).toHaveText('1');
});

test('login con contraseña incorrecta es rechazado', async ({ page }) => {
  const email = `eve-${Date.now()}@test.com`;
  await page.goto('/registro');
  await page.fill('[data-reg-name]', 'Eve');
  await page.fill('[data-reg-email]', email);
  await page.fill('[data-reg-pass]', 'correcta1');
  await page.click('[data-reg-submit]');
  await page.waitForURL('**/progreso');

  await page.goto('/perfil');
  await page.click('[data-pf-logout]');

  await page.goto('/entrar');
  await page.fill('[data-login-email]', email);
  await page.fill('[data-login-pass]', 'incorrecta');
  await page.click('[data-login-submit]');
  await expect(page.locator('[data-login-error]')).toBeVisible();
});
