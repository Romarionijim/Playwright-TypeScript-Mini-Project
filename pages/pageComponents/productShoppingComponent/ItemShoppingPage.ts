import { Locator, expect } from "@playwright/test";
import { LumaMainPage } from "../../LumaMainPage";
import { ProductItemOptionalParamsInterface } from "../../../helpers/optionalParamsInterfaces/OptionalParams";
import { BasePage } from "../../BasePage";

/**
 * @description this class is a composed common class when shopping for an item such as choosing item size, color, 
 * adding the item to cart and choosing the quantity of the item
 */
export class ItemShoppingComponentPage extends BasePage {
  private productItemLocator = '.product-item';
  private addToCartButtonText = 'Add to Cart';
  private productItemSize = '[class="swatch-attribute size"]';
  private productColorLocator = '[class="swatch-attribute color"]';
  private productPriceLocator = '.price';
  private productItemInCartLocator = '[class="product-info-main"]';
  private productQtyLocator = '#qty';

  /**
   * @description function to choose a product item with flexible options to choose from
   * @param productName 
   * @param options represents the optional param interface with flexible options to choose a product item with the
   * attributes that you choose
   * in the test
   */
  public async chooseProductItem(productName: string, options?: ProductItemOptionalParamsInterface) {
    const productItem = await this.deterimeItemScope(productName);
    await this.hover(productItem);
    try {
      if (options?.chooseSize && options.size !== undefined) {
        await this.chooseItemSize(productItem, options.size)
      }
      if (options?.chooseColor && options.color !== undefined) {
        await this.chooseItemColor(productItem, options.color);
      }
      if (options?.validatePrice && options.price !== undefined) {
        await this.validateItemPrice(productItem, options.price);
      }
      if (options?.modifyQuantity && options.quantity !== undefined) {
        await this.modifyQuantity(productItem, options.quantity)
      }
      if (options?.addItemToCart) {
        await this.addProductItemToCart(productItem);
        await this.page.waitForTimeout(2500)
      }
    } catch (error) {
      throw new Error(`none of the conditions were satisfied in function "chooseProductItem" `)
    }
  }

  private async chooseItemSize(productItemLocator: Locator, size: string) {
    const productSize = productItemLocator.locator(`${this.productItemSize} [role="option"]`, { hasText: new RegExp(`^\\b${size}\\b$`, 'i') });
    await this.clickElement(productSize);
  }

  private async chooseItemColor(productItemLocator: Locator, color: string) {
    const colorLocator = productItemLocator.locator(this.productColorLocator);
    const chosenColor = colorLocator.locator(`[option-label="${color}"]`)
    await this.clickElement(chosenColor);
  }

  private async modifyQuantity(productItemLocator: Locator, quantity: string) {
    const itemQuantity = productItemLocator.locator(this.productQtyLocator);
    await this.fillText(itemQuantity, quantity);
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

  /**
   * @description returns the scope of the item if it is an item in a random page or is it inside a cart to get the correct locator
   * and choose product with the correct options and reduce code duplication
   * @param itemText 
   * @returns 
   */
  private async deterimeItemScope(itemText: string) {
    let itemLocator: Locator | undefined;
    let currentPageUrl = await this.getPageUrl();
    if (currentPageUrl.includes('cart')) {
      itemLocator = this.page.locator(this.productItemInCartLocator, { hasText: itemText });
    } else {
      itemLocator = this.page.locator(this.productItemLocator, { hasText: itemText });
    }
    return itemLocator;
  }
}