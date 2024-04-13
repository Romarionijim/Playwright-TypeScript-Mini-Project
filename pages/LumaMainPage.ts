import { Locator, Page, expect } from "@playwright/test";
import { MenuBar } from "../common/navigationEnums/menuBar/MenuBarEnum";
import { BasePage } from "./BasePage";
import { CartActionsOptionalParamsInterface, ClientSideValiationErrorOptionalParamsInterface } from "../helpers/optionalParamsInterfaces/OptionalParams";
import { MenuBarCategories } from "../common/navigationEnums/menuBarCategories/MenuBarCategories";
import { MenuBarSubCategories } from "../common/navigationEnums/menuBarSubCategories/MenuBarSubCategories";
import { ItemShoppingComponentPage } from "./pageComponents/productShoppingComponent/ItemShoppingPage";

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
  private cartPencilIconLocator = '[class="action edit"]';
  private numberOfCartItemsQuantityLocator = '[class="action showcart"] [class="counter qty"]';
  private currentPageTitleLocator = '[data-ui-id="page-title-wrapper"]';
  private clientSideValidationErrorLocator = '[class="mage-error"]';
  private panelHeaderLocator = '[class="panel header"] [class="header links"]';
  private userWelcomeCaptionLocator = '[class="panel wrapper"] [class="greet welcome"]';
  private createAnAccountButtonName = 'Create an Account';
  private fieldWrapperControlLocator = '.fieldset .control'
  protected pageMessageCaptionLocator = '[class="page messages"]'
  private navigationMenuBar = '.navigation a';
  private dialogFooterLocator = '[class="modal-footer"]';

  public async chooseMenuBarOption(menuBarItem: MenuBar) {
    let menuBarValue = this.page.locator(this.navigationMenuBar, { hasText: new RegExp(`^\\${menuBarItem.valueOf()}\\b$`, 'i') });
    if (menuBarItem === 'Women' || menuBarItem === 'Men' || menuBarItem === 'Training' || menuBarItem === 'Gear') {
      await this.hover(menuBarValue);
    } else {
      await this.clickElement(menuBarValue);
    }
  }

  public async chooseMenuCategory(category: MenuBarCategories) {
    const categoryLink = this.page.getByRole('menuitem', { name: category.valueOf() })
    await this.hover(categoryLink);
  }

  /**
   * @description applies to men and women top and bottom categories becasue they are the only onces with subcategories at the moment
   * @param subCategory 
   */

  public async chooseMenuSubCategory(subCategory: MenuBarSubCategories) {
    const categoryLink = this.page.getByRole('menuitem', { name: subCategory.valueOf() })
    await this.clickElement(categoryLink);
  }

  public async fillSearchBox(searchedForItem: string) {
    await this.fillText(this.searchBoxLocator, searchedForItem);
    await this.pressEnter();
  }

  public async clickOnShoppingCart() {
    await this.clickElement(this.numberOfCartItemsQuantityLocator);

  }

  /**
   * @description after clicking on the shopping card you have the option 
   * to perform the following actions on the shopping car: proceed to checkout, 
   * validate cart items, modify item quantity, remove item from cart.
   * @param options optional object that determine the action you want to perform
   */
  public async performActionsOnShoppingCart(options?: CartActionsOptionalParamsInterface) {
    let shoppingCartItemCount = this.page.locator(this.shoppingCartLocator).locator(this.shoppingCartItemCountLocator);
    let shoppingCartCountInnerText = await this.getInnerText(shoppingCartItemCount);
    let parsedShoppingCartCount = Number.parseInt(shoppingCartCountInnerText);
    await this.clickElement(this.numberOfCartItemsQuantityLocator)
    if (parsedShoppingCartCount === 0) {
      const shoppingCartEmptyCaption = this.page.locator(this.emptySubTitleLocator)
      await expect(shoppingCartEmptyCaption).toBeVisible();
      const shoppingCartEmptyInnerText = await this.getInnerText(shoppingCartEmptyCaption);
      expect(shoppingCartEmptyInnerText).toBe(options?.expectedEmptyShoppingCartCaption);
    } else {
      try {
        if (options?.validateItemCartCount && options.cartTotalItems !== undefined) {
          await this.validateItemCartCount(options.cartTotalItems)
        }
        if (options?.validateItemCartSubtotal && options.expectedSubTotalPrice !== undefined) {
          await this.validateCartSubTotalPrice(options.expectedSubTotalPrice)
        }
        if (options?.modifyItemQuantity && options.itemText !== undefined && options.itemQuantity !== undefined) {
          await this.modifyCartItemQuantity(options.itemText, options.itemQuantity);
          await this.validateCartItemQuantity(options.itemText, options.itemQuantity);
        }
        if (options?.clickOnEditPencilIcon && options.itemText !== undefined) {
          await this.clickOnCartItemPencilIcon(options.itemText)
        }
        if (options?.removeItemFromCart && options.itemText !== undefined && options.cartTotalItems !== undefined && options.cartRemovalDialogButtonRole !== undefined) {
          await this.removeItemFromCart(options.itemText, options.cartTotalItems, options.cartRemovalDialogButtonRole)
        }
        if (options?.viewAndEditCart) {
          await this.clickElement(this.viewAndEditCartLocator);
        }
        if (options?.clickProceedToCheckout) {
          await this.clickElement(this.proceedToCheckoutButtonLocator);
          await this.page.waitForTimeout(2500);
        }
      } catch (error) {
        throw new Error(`pleasae refer to function "performActionsOnShoppingCart" - the condition may not be satisifed `)
      }
    }
  }

  private async validateItemCartCount(cartCount: number) {
    const cartTotalItemsInnerText = await this.getInnerText(this.cartTotalItemsLocator);
    expect(cartTotalItemsInnerText).toBe(cartCount);
  }

  private async validateCartSubTotalPrice(expectedSubTotalPrice: string) {
    const cartSubTotalPriceInnerText = await this.page.locator(this.cartSubtotalPrice).innerText();
    expect(cartSubTotalPriceInnerText.trim()).toBe(expectedSubTotalPrice);
  }

  private async modifyCartItemQuantity(itemText: string, itemQuantity: string) {
    const itemQuantityInput = await this.getNestedCartItemLocator(itemText, 'input');
    await this.fillText(itemQuantityInput, itemQuantity);
    const updateButton = this.page.locator('button', { hasText: 'Update' });
    await expect(updateButton).toBeVisible();
    await this.clickElement(updateButton);
  }

  private async validateCartItemQuantity(itemText: string, itemQuantity: string) {
    const itemQuantityInput = await this.getNestedCartItemLocator(itemText, 'input');
    const itemQuantityInputValue = await this.getInnerText(itemQuantityInput);
    expect(itemQuantityInputValue).toBe(itemQuantity);
  }

  private async removeItemFromCart(itemText: string, expectedCartCount: number, buttonRole: string) {
    const removeItemButton = await this.getNestedCartItemLocator(itemText, this.trashIconLocator);
    await this.clickElement(removeItemButton);
    const itemRemovalConfirmation = this.page.locator('div', { hasText: 'Are you sure you would like to remove this item from the shopping cart?' })
    if (await itemRemovalConfirmation.isVisible()) {
      const dialogFooterButton = this.page.getByRole('button', { name: buttonRole })
      await this.clickElement(dialogFooterButton);
    }
    await this.clickElement(this.shoppingCartItemCountLocator);
    await this.countShoppingCartItems(expectedCartCount);
  }

  private async clickOnCartItemPencilIcon(itemText: string) {
    const pencilIcon = await this.getNestedCartItemLocator(itemText, this.cartPencilIconLocator);
    await this.clickElement(pencilIcon);
  }

  /**
   * @description get's the nested/child element of the targeted item in the cart 
   * @param itemText 
   * @param nestedLocator 
   * @returns 
   */
  private async getNestedCartItemLocator(itemText: string, nestedLocator: (string | Locator)) {
    const item = this.page.locator(this.cartItemListLocator, { hasText: itemText })
    const nestedLocatorElement = item.locator(nestedLocator);
    return nestedLocatorElement;
  }


  /**
   * @description validates the number of items that are displayed on the shopping cart
   */
  public async countShoppingCartItems(expectedCount: number) {
    const cartItems = this.page.locator(this.cartItemListLocator);
    const itemCount = await this.countElements(cartItems);
    expect(itemCount).toBe(expectedCount);
  }

  public async clearInputField(inputFieldWrapperLocator: string) {
    const inputFieldWrapper = this.page.locator(inputFieldWrapperLocator);
    const inputField = await inputFieldWrapper.locator('input').inputValue();
    if (inputField.length > 0) {
      await this.clearText(inputField);
    } else {
      throw new Error(`the input field: ${inputField} is already empty!`)
    }
  }

  public async validateNumberOfItemInCart(expectedNumberOfItems: string) {
    const cartItemNumbersInnerText = await this.getInnerText(this.shoppingCartItemCountLocator);
    expect(cartItemNumbersInnerText).toBe(expectedNumberOfItems);
  }

  public async clickSignIn() {
    await this.clickOnLink('Sign In');
  }

  public async validateCurrentPageTitle(pageTitle: string) {
    const currentPageTitle = await this.getInnerText(this.currentPageTitleLocator);
    expect(currentPageTitle).toBe(pageTitle);
  }

  /**
   * @description this function is meant for negative testing to validate that the client side validation errors are displayed
   * on the relevant corresponding fields.
   * It handles situiations where fields are empty or when typing invalid data in the fields.
   * The purpose of this funciton is to return the index of the fields in case they are empty with validation on empty fields
   * as well as returning the client side validation error text and on what fields it occured.
   * The function returns an array of the validation error innertext and the index of each error and makes an assertion validation 
   * on the number of errors that occured, on which field they occoured and their text.
   * @param expectedCount 
   * @param inputFieldsLocator 
   * @param options 
   */
  public async handleClientSideValidationErrors(expectedCount: number, inputFieldsLocator: Locator[], options?: ClientSideValiationErrorOptionalParamsInterface) {
    const cliendSideValidationError = this.page.locator(this.clientSideValidationErrorLocator);
    const validationErrorsCount = await this.countElements(cliendSideValidationError);
    expect(validationErrorsCount).toBe(expectedCount);
    const inputFields = await this.getInputFieldsValues(inputFieldsLocator);
    const emptyFieldIndexes: number[] = [];
    inputFields.forEach((field, index) => {
      if (field.length === 0 || field === '') {
        emptyFieldIndexes.push(index);
      }
    });
    if (options?.isEmptyFieldPresent) {
      expect(emptyFieldIndexes).toEqual(options.emptyFieldsIndexes);
    }
    const validationErrorNthIndex: number[] = []
    const validationErrorTextList: string[] = []
    const validationErrorIndexes = await this.page.locator(this.fieldWrapperControlLocator).all();
    for (let i = 0; i < validationErrorIndexes.length; i++) {
      const fieldWrapperInnexText = await this.getInnerText(validationErrorIndexes[i]);
      const validationErrorFilter = validationErrorIndexes[i].filter({ has: cliendSideValidationError })
      if (await validationErrorFilter.isVisible()) {
        validationErrorNthIndex.push(i);
        validationErrorTextList.push(fieldWrapperInnexText);
      }
    }
    expect(validationErrorNthIndex).toEqual(options?.validationErrorsIndexes);
    expect(validationErrorTextList).toEqual(options?.validationErrorTextList);

  }

  public async getInputFieldsValues(inputFields: Locator[]) {
    const inputFieldList: string[] = []
    for (let i = 0; i < inputFields.length; i++) {
      const inputField = inputFields[i];
      try {
        if (await inputField.evaluate(el => el.tagName.toLowerCase() === 'input')) {
          const inputFieldValue = await inputField.inputValue()
          inputFieldList.push(inputFieldValue);
        } else {
          const inputFieldInnerText = await inputField.innerText();
          inputFieldList.push(inputFieldInnerText);
        }
      } catch (error) {
        throw new Error(`none of the conditions in the function "getInputFieldsValues" were satisfied: ${error}`)
      }
    }
    return inputFieldList;
  }

  public async clickHomePageLogo() {
    const homePageLogo = this.page.getByLabel('store logo');
    await this.clickElement(homePageLogo);
  }

  /**
   * @description function that validates if the user is logged in or not based on the logged in class attribute
   */
  public async getLoggedInState() {
    const panelHeader = this.page.locator(this.panelHeaderLocator);
    const panelHeaderChildTag = panelHeader.locator('span');
    const loggedInClassAttribute = await panelHeaderChildTag.getAttribute('class')
    return loggedInClassAttribute;
  }

  public async validateLoggedInUser(user: string) {
    const loggedInUserWelcomeGreet = this.page.locator(this.userWelcomeCaptionLocator)
    await this.waitForElementToBeVisible(loggedInUserWelcomeGreet);
    const loggedInUser = await this.getInnerText(loggedInUserWelcomeGreet);
    expect(loggedInUser).toBe(`Welcome, ${user}!`)
  }

  /**
   * @description clicks on the create account panel bar link
   */
  public async clickCreateAccount() {
    await this.clickOnLink(this.createAnAccountButtonName);
  }

  /**
   * @description it validates the messaga that is displayed at top of a page after a certain action - the message could a success or a failure
   */
  public async validateCurrentTopPageMessage(expectedMessage: string) {
    const pageTopMessageCaptionInnerText = await this.getInnerText(this.pageMessageCaptionLocator);
    expect(pageTopMessageCaptionInnerText).toBe(expectedMessage);
  }

  public async getColumnIndexByName(tableLocator: string, columnName: string) {
    const tableColumns = await this.page.locator(`${tableLocator} thead th`).all();
    for (let i = 0; i < tableColumns.length; i++) {
      const columnInnerText = await this.getInnerText(tableColumns[i]);
      if (columnInnerText === columnName) {
        return i;
      }
    }
    throw new Error(`column: ${columnName} does not exist on target table`)
  }

  public async validateTableCellValue(tableLocator: string, rowText: string, column: string, expectedCellValue: string) {
    const tableRow = this.page.locator(`${tableLocator} tbody tr`, { hasText: rowText });
    const tableColumn = await this.getColumnIndexByName(tableLocator, column);
    const tableCell = tableRow.locator('td').nth(tableColumn);
    const cellInnerText = await this.getInnerText(tableCell);
    expect(cellInnerText).toBe(expectedCellValue);
  }

  /**
   * @description generic function to proceed to checkout - every page has this option
   */
  public async proceedToCheckout() {
    const proceedToCheckoutButton = this.page.getByRole('button', { name: 'Proceed to Checkout' });
    await this.clickElement(proceedToCheckoutButton);
  }

  /**
   * @description clicks on the desired button from a specific row that contains a specific text on a table
   */
  public async clickOnTargetButtonFromSpecificTableRow(tableLocator: string, rowText: string, buttonLocator: (string | Locator)) {
    const tableRow = this.page.locator(`${tableLocator} tbody tr`, { hasText: rowText });
    const tableRowButton = tableRow.locator(buttonLocator);
    await this.clickElement(tableRowButton);
  }

  public async validateAllTableCellValues(tableLocator: string, rowText: string, expectedCellValues: string[]) {
    const tableRow = this.page.locator(`${tableLocator} tbody tr`, { hasText: rowText });
    const tableRowInnerText = await this.getInnerText(tableRow);
    const tableRowCellValues = tableRowInnerText.split('\n');
    for (let item of expectedCellValues) {
      if (!tableRowCellValues.includes(item)) {
        throw new Error(`one of the expected cell values: ${expectedCellValues} do not exist on table row`)
      }
    }
    expect(tableRowCellValues).toEqual(expectedCellValues);
  }
} 