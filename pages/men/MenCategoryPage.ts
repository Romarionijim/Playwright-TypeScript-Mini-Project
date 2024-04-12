import { Page } from "@playwright/test";
import { LumaMainPage } from "../LumaMainPage";
import { ItemShoppingComponentPage } from "../pageComponents/productShoppingComponent/ItemShoppingPage";
import { SideBarShoppingComponentPage } from "../pageComponents/sidebarShoppingComponent/SideBarShoppingComponentPage";

export class MenCategoryPage extends LumaMainPage {
  itemShoppingPage: ItemShoppingComponentPage;
  sideBarShoppingComponent: SideBarShoppingComponentPage;

  constructor(page: Page) {
    super(page)
    this.itemShoppingPage = new ItemShoppingComponentPage(page);
    this.sideBarShoppingComponent = new SideBarShoppingComponentPage(page);
  }
}