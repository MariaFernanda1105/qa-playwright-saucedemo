import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../fixtures/users';

test.describe('Carrinho', () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await expect(productsPage.inventoryItems.first()).toBeVisible();
  });

  test('@smoke Adicionar um produto ao carrinho', async () => {
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    await productsPage.expectCartCount(1);
  });

  test('Adicionar vários produtos ao carrinho', async () => {
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    await productsPage.addProductToCartByName('Sauce Labs Bike Light');
    await productsPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
    await productsPage.expectCartCount(3);
  });

  test('Adicionar todos os produtos ao carrinho', async () => {
    await productsPage.addAllProductsToCart();
    await productsPage.expectCartCount(6);
  });

  test('Remover um produto do carrinho', async () => {
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    await productsPage.expectCartCount(1);
    await productsPage.removeProductByName('Sauce Labs Backpack');
    await productsPage.expectCartCount(0);
  });

  test('Remover todos os produtos do carrinho', async () => {
    await productsPage.addAllProductsToCart();
    await productsPage.expectCartCount(6);
    await productsPage.goToCart();
    await cartPage.removeAllItems();
    const count = await cartPage.getItemCount();
    expect(count).toBe(0);
  });

  test('Persistência do carrinho após navegação', async ({ page }) => {
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    await productsPage.goToCart();
    await expect(page).toHaveURL(/cart/);
    const count = await cartPage.getItemCount();
    expect(count).toBe(1);
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory/);
    await productsPage.expectCartCount(1);
  });

  test('Quantidade correta no carrinho', async () => {
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    await productsPage.addProductToCartByName('Sauce Labs Bike Light');
    await productsPage.goToCart();
    const count = await cartPage.getItemCount();
    expect(count).toBe(2);
  });
});
