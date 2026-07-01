import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { users } from '../fixtures/users';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('@smoke Login válido com standard_user', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
    const productsPage = new ProductsPage(page);
    await expect(productsPage.inventoryItems.first()).toBeVisible();
  });

  test('Login válido com performance_glitch_user', async ({ page }) => {
    await loginPage.login(users.performanceGlitch.username, users.performanceGlitch.password);
    await expect(page).toHaveURL(/inventory/, { timeout: 10000 });
    const productsPage = new ProductsPage(page);
    await expect(productsPage.inventoryItems.first()).toBeVisible();
  });

  test('Usuário bloqueado deve exibir mensagem de erro', async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectErrorMessage(/locked out/);
  });

  test('Senha incorreta deve exibir mensagem de erro', async () => {
    await loginPage.login(users.invalidPassword.username, users.invalidPassword.password);
    await loginPage.expectErrorMessage(/Username and password do not match/);
  });

  test('Campos vazios devem exibir mensagem de erro', async () => {
    await loginPage.login(users.empty.username, users.empty.password);
    await loginPage.expectErrorMessage(/Username is required/);
  });

  test('Espaços em branco devem exibir mensagem de erro', async () => {
    await loginPage.login(users.whitespace.username, users.whitespace.password);
    await loginPage.expectErrorMessage(/Username and password do not match/);
  });

  test('SQL Injection não deve funcionar', async () => {
    await loginPage.login(users.sqlInjection.username, users.sqlInjection.password);
    await loginPage.expectErrorMessage(/Username and password do not match/);
  });

  test('Logout deve retornar para a página de login', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    const productsPage = new ProductsPage(page);
    await productsPage.logout();
    await loginPage.expectLoginPageVisible();
    await expect(page).toHaveURL('/');
  });
});
