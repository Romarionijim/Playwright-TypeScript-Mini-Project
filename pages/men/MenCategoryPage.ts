import { Page } from "@playwright/test";
import { LumaMainPage } from "../LumaMainPage";
import { ItemShoppingComponentPage } from "../pageComponents/productShoppingComponent/ItemShoppingPage";

export class MenCategoryPage extends LumaMainPage {
  itemShoppingPage: ItemShoppingComponentPage;
  constructor(page: Page) {
    super(page)
    this.itemShoppingPage = new ItemShoppingComponentPage(page);
  }
}