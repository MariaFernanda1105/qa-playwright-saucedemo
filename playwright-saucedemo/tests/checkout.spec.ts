import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, checkoutInfo } from '../fixtures/users';

test.describe('Checkout', () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await expect(productsPage.inventoryItems.first()).toBeVisible();
  });

  test('@smoke Fluxo completo de checkout', async ({ page }) => {
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one/);

    await checkoutPage.fillInformation(
      checkoutInfo.valid.firstName,
      checkoutInfo.valid.lastName,
      checkoutInfo.valid.postalCode
    );
    await checkoutPage.continue();
    await expect(page).toHaveURL(/checkout-step-two/);
    await checkoutPage.expectTotalVisible();

    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete/);
    await checkoutPage.expectOrderComplete();
  });

  test('Campo First Name obrigatório', async () => {
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation(
      checkoutInfo.missingFirstName.firstName,
      checkoutInfo.missingFirstName.lastName,
      checkoutInfo.missingFirstName.postalCode
    );
    await checkoutPage.continue();
    await checkoutPage.expectErrorMessage(/First Name is required/);
  });

  test('Campo Last Name obrigatório', async () => {
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation(
      checkoutInfo.missingLastName.firstName,
      checkoutInfo.missingLastName.lastName,
      checkoutInfo.missingLastName.postalCode
    );
    await checkoutPage.continue();
    await checkoutPage.expectErrorMessage(/Last Name is required/);
  });

  test('Campo Postal Code obrigatório', async () => {
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation(
      checkoutInfo.missingPostalCode.firstName,
      checkoutInfo.missingPostalCode.lastName,
      checkoutInfo.missingPostalCode.postalCode
    );
    await checkoutPage.continue();
    await checkoutPage.expectErrorMessage(/Postal Code is required/);
  });

  test('Cancelar checkout deve retornar ao carrinho', async ({ page }) => {
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.checkout();
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/cart/);
  });

  test('Finalizar compra com múltiplos itens', async ({ page }) => {
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    await productsPage.addProductToCartByName('Sauce Labs Bike Light');
    await productsPage.goToCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation(
      checkoutInfo.valid.firstName,
      checkoutInfo.valid.lastName,
      checkoutInfo.valid.postalCode
    );
    await checkoutPage.continue();
    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete/);
    await checkoutPage.expectOrderComplete();
  });
});
