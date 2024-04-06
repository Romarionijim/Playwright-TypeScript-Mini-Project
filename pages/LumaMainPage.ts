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

  public async chooseMenuBarOption(menuBarItem: MenuBar) {
    let menuBarValue = menuBarItem.valueOf();
    if (menuBarValue === 'Women' || menuBarValue === 'Men' || menuBarValue === 'Training') {
      await this.hover(menuBarValue);
    } else {
      await this.clickElement(menuBarValue);
    }
  }

  public async chooseMenuCategory(category: MenuBarCategories) {
    const categoryLink = this.page.getByRole('link', { name: category.valueOf() })
    await this.hover(categoryLink);
  }

  /**
   * @description applies to men and women top and bottom categories becasue they are the only onces with subcategories at the moment
   * @param subCategory 
   */

  public async chooseMenuSubCategory(subCategory: MenuBarSubCategories) {
    const categoryLink = this.page.getByRole('link', { name: subCategory.valueOf() })
    await this.clickElement(categoryLink);
  }

  public async fillSearchBox(searchedForItem: string) {
    await this.fillText(this.searchBoxLocator, searchedForItem);
    await this.pressEnter();
  }

  public async clickOnShoppingCart() {
    await this.clickElement(this.shoppingCartLocator);

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
        if (options?.clickProceedToCheckout) {
          await this.clickElement(this.proceedToCheckoutButtonLocator);
        }
        if (options?.validateItemCartSubtotal && options.expectedSubTotalPrice !== undefined) {
          await this.validateCartSubTotalPrice(options.expectedSubTotalPrice)
        }
        if (options?.modifyItemQuantity && options.itemText !== undefined && options.itemQuantity !== undefined) {
          await this.modifyCartItemQuantity(options.itemText, options.itemQuantity);
          await this.validateCartItemQuantity(options.itemText, options.itemQuantity);
        }
        if (options?.removeItemFromCart && options.itemText !== undefined && options.cartTotalItems !== undefined) {
          await this.removeItemFromCart(options.itemText, options.cartTotalItems)
        }
        if (options?.clickOnEditPencilIcon && options.itemText !== undefined) {
          await this.clickOnCartItemPencilIcon(options.itemText)
        }
        if (options?.viewAndEditCart) {
          await this.clickElement(this.viewAndEditCartLocator);
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

  private async removeItemFromCart(itemText: string, expectedCartCount: number) {
    const removeItemButton = await this.getNestedCartItemLocator(itemText, this.trashIconLocator);
    await this.clickElement(removeItemButton);
    await this.countShoppingCartItems(expectedCartCount);
  }

  private async clickOnCartItemPencilIcon(itemText: string) {
    const pencilIcon = await this.getNestedCartItemLocator(itemText, this.cartPencilIconLocator);
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
    const itemCount = await this.countElement(cartItems);
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
    const cartItemNumbersInnerText = await this.getInnerText(this.numberOfCartItemsQuantityLocator);
    expect(cartItemNumbersInnerText).toBe(expectedNumberOfItems);
  }

  public async clickSignIn() {
    await this.clickOnLink('Sign In');
  }

  public async validateCurrentPageTitle(pageTitle: string) {
    const currentPageTitle = await this.getInnerText(this.currentPageTitleLocator);
    expect(currentPageTitle).toBe(pageTitle);
  }

  public async countClientSideValidationErrors(expectedCount: number, inputFieldsLocator: Locator[], options?: ClientSideValiationErrorOptionalParamsInterface) {
    const cliendSideValidationError = this.page.locator(this.clientSideValidationErrorLocator);
    const validationErrorsCount = await this.countElement(cliendSideValidationError);
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
        if (await inputField.evaluate(el => el.tagName.toLowerCase() == 'input')) {
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
    const PanelHeaderChildTag = panelHeader.locator('span');
    const loggedInClassAttribute = await PanelHeaderChildTag.getAttribute('class')
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
}