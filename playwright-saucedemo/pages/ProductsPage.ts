import { Page, Locator, expect } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class ProductsPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly itemImages: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.itemImages = page.locator('.inventory_item_img img');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async getProductCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async getProductNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async sortBy(option: SortOption) {
    await this.sortDropdown.selectOption(option);
  }

  async addProductToCartByName(name: string) {
    const item = this.page.locator('.inventory_item', { hasText: name });
    await item.locator('button', { hasText: 'Add to cart' }).click();
  }

  async removeProductByName(name: string) {
    const item = this.page.locator('.inventory_item', { hasText: name });
    await item.locator('button', { hasText: 'Remove' }).click();
  }

  async addAllProductsToCart() {
    const buttons = this.page.locator('button', { hasText: 'Add to cart' });
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await buttons.first().click();
    }
  }

  async expectCartCount(count: number) {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async expectAllImagesLoaded() {
    const count = await this.itemImages.count();
    for (let i = 0; i < count; i++) {
      const src = await this.itemImages.nth(i).getAttribute('src');
      expect(src).toBeTruthy();
    }
  }
}
