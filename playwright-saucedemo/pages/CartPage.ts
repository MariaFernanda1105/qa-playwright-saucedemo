import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async removeItemByName(name: string) {
    const item = this.page.locator('.cart_item', { hasText: name });
    await item.locator('button', { hasText: 'Remove' }).click();
  }

  async removeAllItems() {
    const buttons = this.page.locator('button', { hasText: 'Remove' });
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await buttons.first().click();
    }
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async expectItemNames(names: string[]) {
    const itemNames = await this.page.locator('.inventory_item_name').allTextContents();
    expect(itemNames.sort()).toEqual(names.sort());
  }
}
