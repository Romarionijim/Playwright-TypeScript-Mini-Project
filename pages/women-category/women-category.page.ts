import { Page } from "@playwright/test";
import { LumaMainPage } from "@pages";
import { ItemShoppingComponentPage } from "@pages";
import { SideBarShoppingComponentPage } from "@pages";

export class WomenCategoryPage extends LumaMainPage {
  itemShoppingComponent: ItemShoppingComponentPage;
  sideBarShoppingComponent: SideBarShoppingComponentPage;

  constructor(page: Page) {
    super(page)
    this.itemShoppingComponent = new ItemShoppingComponentPage(page);
    this.sideBarShoppingComponent = new SideBarShoppingComponentPage(page);
  }
}