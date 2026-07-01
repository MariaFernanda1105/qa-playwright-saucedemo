import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { users } from '../fixtures/users';

test.describe('Produtos', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    productsPage = new ProductsPage(page);
    await expect(productsPage.inventoryItems.first()).toBeVisible();
  });

  test('@smoke Verificar quantidade de produtos (6)', async () => {
    const count = await productsPage.getProductCount();
    expect(count).toBe(6);
  });

  test('Verificar nomes dos produtos', async () => {
    const names = await productsPage.getProductNames();
    expect(names).toEqual([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ]);
  });

  test('Verificar preços dos produtos', async () => {
    const prices = await productsPage.getProductPrices();
    expect(prices).toEqual([29.99, 9.99, 15.99, 49.99, 7.99, 15.99]);
  });

  test('Todas as imagens devem estar carregadas', async () => {
    await productsPage.expectAllImagesLoaded();
  });

  test('Ordenação A → Z', async () => {
    await productsPage.sortBy('az');
    const names = await productsPage.getProductNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test('Ordenação Z → A', async () => {
    await productsPage.sortBy('za');
    const names = await productsPage.getProductNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

  test('Ordenação menor preço', async () => {
    await productsPage.sortBy('lohi');
    const prices = await productsPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('Ordenação maior preço', async () => {
    await productsPage.sortBy('hilo');
    const prices = await productsPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
