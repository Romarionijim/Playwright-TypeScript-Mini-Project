import { expect } from "@playwright/test";
import { SideBarShoppingItemListEnum } from "../../../common/componentEnums/SideBarShoppingItemListEnum";
import { SideBarShoppingOptionsEnum } from "../../../common/componentEnums/SideBarShoppingOptionsEnum";
import { BasePage } from "../../BasePage";

export class SideBarShoppingComponentPage extends BasePage {
  private sideBarShoppingOptionsWrapperLocator = '[class="sidebar sidebar-main"]';
  private sideBarShoppingOptionsItemsLocator = '[class="filter-options-item"]';
  private shoppingOptionsItemsList = '[class="filter-options-item allow active"] .item';
  private filteredByItemsLocator = '[class="filter-current"] .items li';

  public async chooseSideBarShoppingOption(shoppingOption: SideBarShoppingOptionsEnum, item: SideBarShoppingItemListEnum) {
    let sideBarShoppingWrapper = this.page.locator(this.sideBarShoppingOptionsWrapperLocator);
    let sideBarShoppingOptions = sideBarShoppingWrapper.locator(this.sideBarShoppingOptionsItemsLocator, { hasText: shoppingOption.valueOf() });
    await this.clickElement(sideBarShoppingOptions);
    const shoppingListItem = this.page.locator(this.shoppingOptionsItemsList, { hasText: item.valueOf() });
    await this.clickElement(shoppingListItem);
  }

  /**
   * @description validates the filtered by options if we added filters to the product that we want to purchase
   */
  public async validateFilteredOptions(expectedFilterList: string[]) {
    const filteredByItems = this.page.locator(this.filteredByItemsLocator)
    await expect(filteredByItems).toContainText(expectedFilterList);
  }
}