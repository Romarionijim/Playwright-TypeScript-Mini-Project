import { Locator, expect } from "@playwright/test";
import { LumaMainPage } from "../../LumaMainPage";
import { ProductItemOptionalParamsInterface } from "../../../helpers/optionalParamsInterfaces/OptionalParams";

/**
 * @description this class is a composed common class when shopping for an item such as choosing item size, color, 
 * adding the item to cart and choosing the quantity of the item
 */
export class ItemShoppingComponentPage extends LumaMainPage {
  private productItemLocator = '.product-item';
  private addToCartButtonText = 'Add to Cart';
  private productItemSize = '[class="swatch-attribute size"]';
  private productColorLocator = '[class="swatch-attribute color"]';
  private productPriceLocator = '.price';

  /**
   * @description function to choose a product item with flexible options to choose from
   * @param productName 
   * @param options represents the optional param interface with flexible options to choose a product item with the conditions that you choos
   * in the test
   */
  public async chooseProductItem(productName: string, options?: ProductItemOptionalParamsInterface) {
    const productItem = this.page.locator(this.productItemLocator, { hasText: productName });
    await this.hover(productItem);
    if (options?.chooseSize && options.size !== undefined) {
      await this.chooseItemSize(productItem, options.size)
    } else if (options?.chooseColor && options.color !== undefined) {
      await this.chooseItemColor(productItem, options.color);
    } else if (options?.validatePrice && options.price !== undefined) {
      await this.validateItemPrice(productItem, options.price);
    } else if (options?.addItemToCart) {
      await this.addProductItemToCart(productItem);
    }
  }

  private async chooseItemSize(productItemLocator: Locator, size: string) {
    const productSize = productItemLocator.locator(this.productItemSize);
    const sizeOption = productSize.getByRole('option', { name: size })
    await this.clickElement(sizeOption);
  }

  private async chooseItemColor(productItemLocator: Locator, color: string) {
    const colorLocator = productItemLocator.locator(this.productColorLocator);
    const chosenColor = colorLocator.locator(`[option-label="${color}"]`)
    await this.clickElement(chosenColor);
  }

  private async validateItemPrice(productItemLocator: Locator, price: string) {
    const productItemPrice = productItemLocator.locator(this.productPriceLocator);
    expect(productItemPrice).toBe(price);
  }

  private async addProductItemToCart(productItemLocator: Locator) {
    const addToCartButton = this.page.getByRole('button', { name: this.addToCartButtonText });
    const addProductToCart = productItemLocator.locator(addToCartButton);
    await this.clickElement(addProductToCart);
  }
}