import { Page } from "@playwright/test";
import { LumaMainPage } from "../LumaMainPage";
import { ItemShoppingComponentPage } from "../pageComponents/productShoppingComponent/ItemShoppingPage";
import { SideBarShoppingComponentPage } from "../pageComponents/sidebarShoppingComponent/SideBarShoppingComponentPage";

export class WomenCategoryPage extends LumaMainPage {
  itemShoppingComponent: ItemShoppingComponentPage;
  sideBarShoppingComponent: SideBarShoppingComponentPage;

  constructor(page: Page) {
    super(page)
    this.itemShoppingComponent = new ItemShoppingComponentPage(page);
    this.sideBarShoppingComponent = new SideBarShoppingComponentPage(page);
  }
}