import { Page, expect } from "@playwright/test";
import { LumaMainPage } from "../LumaMainPage";
import { ItemShoppingComponentPage } from "../pageComponents/productShoppingComponent/ItemShoppingPage";

export enum CartActionsEnum {
  EDIT = 'Edit',
  REMOVE = 'Remove'
}

export class ShoppingCartPage extends LumaMainPage {
  private cartItemLocator = '[class="cart item"]';
  private moveToWishListLinkName = 'Move to Wishlist'
  private updateShoppingCartButtonName = 'Update Shopping Cart'
  private shoppingCartTable = '[class="cart table-wrapper"]';
  private subTotalTableColumn = 'Subtotal';
  private editCartItemLocator = '[class="action action-edit"]';
  private removeItemLocator = '[class="action action-delete"]';
  private orderTotalLocator = '.grand.totals .amount';
  itemShoppingPage: ItemShoppingComponentPage;

  constructor(page: Page) {
    super(page);
    this.itemShoppingPage = new ItemShoppingComponentPage(page);
  }

  public async updateItemQuantity(quantity: string, expectedQuantity: string,) {
    const cartItem = this.page.locator(this.cartItemLocator);
    const itemQuantity = cartItem.locator('input');
    await this.fillText(itemQuantity, quantity);
    const quantityInnerText = await this.getInnerText(itemQuantity);
    expect(quantityInnerText).toBe(expectedQuantity);
  }

  public async updateShoppingCart() {
    const updateShoppingCartButton = this.page.getByRole('button', { name: this.updateShoppingCartButtonName });
    await this.clickElement(updateShoppingCartButton);
  }

  public async moveItemToWishList() {
    await this.clickOnLink(this.moveToWishListLinkName);
  }

  public async validateItemPrice(itemText: string, expectedTotalPrice: string) {
    await this.validateTableCellValue(this.shoppingCartTable, itemText, this.subTotalTableColumn, expectedTotalPrice);
  }

  /**
   * @description helper function for modify cart item function
   * @param itemText 
   * @param buttonLocator 
   */
  private async clickOnCartTargetButton(itemText: string, buttonLocator: string) {
    await this.clickOnTargetButtonFromSpecificTableRow(this.shoppingCartTable, itemText, buttonLocator);
  }
  /**
   * @description this function clicks on either edit item button or delete an item from cart based on the enum value you choose
   */
  public async modifyCartItem(cartAction: CartActionsEnum, itemName: string) {
    try {
      switch (cartAction) {
        case CartActionsEnum.EDIT:
          await this.clickOnCartTargetButton(itemName, this.editCartItemLocator);
          break;
        case CartActionsEnum.REMOVE:
          await this.clickOnCartTargetButton(itemName, this.removeItemLocator);
          break;
      }
    } catch (error) {
      throw new Error(`an error occured on function "modifyCartItem": ${error} `)
    }
  }

  public async validateCartItemsCount(expectedItemCount: number) {
    const itemCount = await this.countElements(this.cartItemLocator);
    expect(itemCount).toBe(expectedItemCount);
  }

  public async validateCartTotal(expectedTotal: string) {
    const cartTotal = await this.getInnerText(this.orderTotalLocator);
    expect(cartTotal).toBe(expectedTotal);
  }
}