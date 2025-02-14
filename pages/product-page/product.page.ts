import { Page, expect } from "@playwright/test";
import { LumaMainPage } from "@pages";
import { ItemShoppingComponentPage } from "@pages";

export enum ProductStockAvailability {
  IN_STOCK = 'In Stock',
  OUT_OF_STOCK = 'Out Of Stock',
}

export class ProductPage extends LumaMainPage {
  private productInStockLocator = '[class="product-info-stock-sku"]'
  private addToWishListLink = 'Add to Wish List';
  private addToCompareLink = 'Add to Compare';
  private updateCartLocator = '#product-updatecart-button';
  private availabilityLocator = '[title="Availability"]'
  itemShoppingPage: ItemShoppingComponentPage;

  constructor(page: Page) {
    super(page);
    this.itemShoppingPage = new ItemShoppingComponentPage(page);
  }

  public async validateProductStockAvailability(expectedStockStatus: string) {
    let producyAvailibility: ProductStockAvailability | undefined;
    const productStock = this.page.locator(this.productInStockLocator);
    const stockStatus = await productStock.locator(this.availabilityLocator).getAttribute('class');
    if (stockStatus === 'stock available') {
      producyAvailibility = ProductStockAvailability.IN_STOCK;
    } else {
      producyAvailibility = ProductStockAvailability.OUT_OF_STOCK;
    }
    expect(producyAvailibility).toBe(expectedStockStatus);
  }

  public async addProductToWishList() {
    await this.clickOnLink(this.addToWishListLink);
  }

  public async addProductToCompare() {
    await this.clickOnLink(this.addToCompareLink);
  }

  public async updateCart() {
    await this.clickElement(this.updateCartLocator);
  }
}