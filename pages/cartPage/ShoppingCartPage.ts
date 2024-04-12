import { Page, expect } from "@playwright/test";
import { LumaMainPage } from "../LumaMainPage";
import { ItemShoppingComponentPage } from "../pageComponents/productShoppingComponent/ItemShoppingPage";

export class ShoppingCartPage extends LumaMainPage {
  private cartItemLocator = '[class="cart item"]';
  private moveToWishListLinkName = 'Move to Wishlist'
  private updateShoppingCartButtonName = 'Update Shopping Cart'
  private shoppingCartTable = '#shopping-cart-table ';
  private subTotalTableColumn = 'Subtotal';
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
}