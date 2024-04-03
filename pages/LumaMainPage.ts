import { expect } from "@playwright/test";
import { MenuBar } from "../helpers/enums/MenuBarEnum";
import { BasePage } from "./BasePage";

export class LumaMainPage extends BasePage {
  private searchBoxLocator = '#search';
  private shoppingCartLocator = '.action.showcart';
  private shoppingCartItemCountLocator = '.counter-number';
  private cartTotalItemsLocator = '.items-total';
  private emptySubTitleLocator = '.subtitle.empty';
  private proceedToCheckoutButtonLocator = '#top-cart-btn-checkout';
  private cartSubtotalPrice = '#minicart-content-wrapper .amount.price-container .price';
  private cartItemListLocator = '[class="minicart-items-wrapper"] li';
  private trashIconLocator = '[class="action delete"]';
  private viewAndEditCartLocator = '[class="action viewcart"]';

  public async chooseMenuBarItem(menuBarItem: MenuBar) {
    let menuBarValue = menuBarItem.valueOf();
    if (menuBarValue === 'Women' || menuBarValue === 'Men' || menuBarValue === 'Training') {
      await this.hover(menuBarValue);
    } else {
      await this.clickElement(menuBarValue);
    }
  }

  public async fillSearchBox(searchedForItem: string) {
    await this.fillText(this.searchBoxLocator, searchedForItem);
  }

  public async clickOnShoppingCart() {
    await this.clickElement(this.shoppingCartLocator);

  }

  /**
   * @description after clicking on the shopping card you have the option perform the following: proceed to checkout, 
   * validate cart items, modify item quantity, remove item from cart.
   * @param options optional boolean param object that determine the action you want to perform
   */
  public async performActionsOnShoppingCart(options?: {
    validateItemCartCount?: boolean, clickProceedToCheckout?: boolean,
    validateItemCartSubtotal?: boolean, modifyItemQuantity?: boolean,
    clickOnEditPencilIcon?: boolean, removeItemFromCart?: boolean,
    viewAndEditCart?: boolean, expectedEmptyShoppingCartCaption?: string,
    cartTotalItems?: number, expectedSubTotalPrice?: string,
    itemText?: string, itemQuantity?: string
  }) {
    let shoppingCartItemCount = this.page.locator(this.shoppingCartLocator).locator(this.shoppingCartItemCountLocator);
    let shoppingCartCountInnerText = await shoppingCartItemCount.innerText();
    let parsedShoppingCartCount = Number.parseInt(shoppingCartCountInnerText);
    if (parsedShoppingCartCount === 0) {
      const shoppingCartEmptyCaption = this.page.locator(this.emptySubTitleLocator)
      await expect(shoppingCartEmptyCaption).toBeVisible();
      const shoppingCartEmptyInnerText = await shoppingCartEmptyCaption.innerText();
      expect(shoppingCartEmptyInnerText.trim()).toBe(options?.expectedEmptyShoppingCartCaption);
    } else {
      if (options?.validateItemCartCount !== undefined) {
        const cartTotalItemsInnerText = await this.page.locator(this.cartTotalItemsLocator).innerText();
        expect(cartTotalItemsInnerText.trim()).toBe(options.cartTotalItems);
      } else if (options?.clickProceedToCheckout !== undefined) {
        await this.clickElement(this.proceedToCheckoutButtonLocator);
      } else if (options?.validateItemCartSubtotal !== undefined) {
        const cartSubTotalPriceInnerText = await this.page.locator(this.cartSubtotalPrice).innerText()
        expect(cartSubTotalPriceInnerText.trim()).toBe(options.expectedSubTotalPrice);
      } else if (options?.modifyItemQuantity !== undefined && options.itemQuantity !== undefined) {
        const item = this.page.locator(this.cartItemListLocator, { hasText: options.itemText })
        const itemQuantityInput = item.locator('input');
        await this.fillText(itemQuantityInput, options.itemQuantity);
        const updateButton = this.page.locator('button', { hasText: 'Update' })
        await expect(updateButton).toBeVisible();
        await this.clickElement(updateButton)
        const itemQuantityInputValue = await this.getElementInnerTextOrInputValue(itemQuantityInput);
        expect(itemQuantityInputValue).toBe(options.itemQuantity)
      } else if (options?.removeItemFromCart !== undefined && options.cartTotalItems !== undefined) {
        const item = this.page.locator(this.cartItemListLocator, { hasText: options.itemText })
        const removeItemButton = item.locator(this.trashIconLocator);
        await this.clickElement(removeItemButton);
        await this.countShoppingCartItems(options.cartTotalItems)
      } else if (options?.viewAndEditCart !== undefined) {
        await this.clickElement(this.viewAndEditCartLocator);
      }
    }
  }

  /**
   * @description validates the number of items that are displayed on the shopping cart
   */
  public async countShoppingCartItems(expectedCount: number) {
    const cartItems = this.page.locator(this.cartItemListLocator);
    const itemCount = await this.countElement(cartItems);
    expect(itemCount).toBe(expectedCount);
  }

  public async clearInputField() {
    const inputField = await this.page.locator('input').inputValue();
    if (inputField.length > 0) {
      await this.clearText(inputField);
    } else {
      throw new Error(`the input field: ${inputField} is already empty!`)
    }
  }
}