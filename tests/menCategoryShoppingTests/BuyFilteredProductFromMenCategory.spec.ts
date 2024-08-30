import { SideBarShoppingItemListEnum } from '@common'
import { SideBarShoppingOptionsEnum } from '@common'
import { MenuBar } from '@common'
import { MenuBarCategories } from '@common'
import { MenuBarSubCategories } from '@common'
import { Randomizer } from '@helpers'
import { test } from '@helpers'

test('purchase product from specific category', { tag: ['@MEN_CATEGORY_SHOPPING'] }, async ({ loadApplication, menCategoryPage, checkoutShippingPage, checkoutPaymentPage }) => {
  let jacketPageTitle: string = 'Jackets';
  let jacketName: string = 'Montana Wind Jacket';
  let jacketSize: string = 'XL';
  let jacketColor: string = 'Black';
  let filters: string[] = ['Lightweight']
  let cartQuantity: number = 1
  let email: string = Randomizer.getRandomEmail();
  let firstname: string = Randomizer.getRandomFirstName();
  let lastname: string = Randomizer.getRandomLastName()
  let company: string = Randomizer.getRandomCompanyName();
  let streetAddress: string = Randomizer.getRandomStreetAddress();
  let city: string = Randomizer.getRandomCityName();
  let state: string = 'Florida'
  let postalCode: string = Randomizer.getRandomPostalCode();
  let country: string = 'United States'
  let phoneNumber: string = Randomizer.getRandomPhoneNumber();
  let shippingMethod: string = 'Best Way';
  let purchaseConfirmation: string = 'Thank you for your purchase!';
  let streetFieldIndex: number = 0;

  await test.step('choose men category then hover over men tops and click on jackets', async () => {
    await menCategoryPage.chooseMenuBarOption(MenuBar.MEN);
    await menCategoryPage.chooseMenuCategory(MenuBarCategories.TOPS);
    await menCategoryPage.chooseMenuSubCategory(MenuBarSubCategories.JACKETS);
  })
  await test.step('validate that your in the jackets category page and choose jacket style from side bar shopping options', async () => {
    await menCategoryPage.validateCurrentPageTitle(jacketPageTitle);
    await menCategoryPage.sideBarShoppingComponent.chooseSideBarShoppingOption(SideBarShoppingOptionsEnum.STYLE, SideBarShoppingItemListEnum.LIGHTWEIGHT);
  })
  await test.step('validate the items are acutally filtered by lightweight jackets, choose jacket size and color then add jacket to cart', async () => {
    await menCategoryPage.sideBarShoppingComponent.validateFilteredOptions(filters);
    await menCategoryPage.itemShoppingComponent.chooseProductItem(jacketName, { chooseSize: true, size: jacketSize, chooseColor: true, color: jacketColor, addItemToCart: true });
  })
  await test.step('click on cart validate cart item quantity then proceed to checkout', async () => {
    await menCategoryPage.performActionsOnShoppingCart({ cartTotalItems: cartQuantity, clickProceedToCheckout: true })
  })
  await test.step('fill shipping details, choose shipping method and click on next for payment address validation', async () => {
    await checkoutShippingPage.fillShippingDetails({ email, firstname, lastname, country, company, streetFieldIndex: streetFieldIndex, streetAddress, city, state, postalCode, phoneNumber });
    await checkoutShippingPage.chooseShippingMethod(shippingMethod);
    await checkoutShippingPage.clickNext();
    await checkoutPaymentPage.validateBillingAndShippingDetails([`${firstname} ${lastname}`, streetAddress, `${city}, ${state} ${postalCode}`, country, phoneNumber])
  })
  await test.step('place order and validate order was successful', async () => {
    await checkoutPaymentPage.clickPlaceOrder();
    await checkoutPaymentPage.validatePurchaseConfirmationMessage(purchaseConfirmation)
  })
})