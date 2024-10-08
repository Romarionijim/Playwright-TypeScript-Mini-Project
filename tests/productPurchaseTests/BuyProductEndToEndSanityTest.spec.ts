import { MenuBar } from '@common'
import { MenuBarCategories } from '@common';
import { MenuBarSubCategories } from '@common';
import { test } from '@helpers'

test('Purchase product end to end test', { tag: ['@SANITY'] }, async ({ checkoutShippingPage, checkoutPaymentPage, menCategoryPage }) => {
  let productName: string = 'Proteus Fitness Jackshirt';
  let productSize: string = 'L';
  let productColor: string = 'Orange';
  let totalItemInCartNumber: string = '1';
  let shippingMethod: string = 'Flat Rate';
  let cartSubtotal: string = 'Cart Subtotal';
  let shipping: string = 'Shipping';
  let orderTotal: string = 'Order Total';
  let purchaseConfirmation: string = 'Thank you for your purchase!';
  let expectedUserAddressDetails: string[] = ['John Doe', 'Jump Street 20', 'Miami, Florida 1000 P.O', 'United States', '55555'];

  await test.step('navigate to men category ', async () => {
    await menCategoryPage.loadApp();
    await menCategoryPage.chooseMenuBarOption(MenuBar.MEN);
    await menCategoryPage.chooseMenuCategory(MenuBarCategories.TOPS);
    await menCategoryPage.chooseMenuSubCategory(MenuBarSubCategories.JACKETS);
  })
  await test.step('choose a product with size and color then add product to cart', async () => {
    await menCategoryPage.itemShoppingComponent.chooseProductItem(productName, { chooseSize: true, size: productSize, chooseColor: true, color: productColor, addItemToCart: true })
  })
  await test.step('validate there is one item in cart', async () => {
    await menCategoryPage.validateNumberOfItemInCart(totalItemInCartNumber);
  })
  await test.step('click on cart and proceed to checkout', async () => {
    await menCategoryPage.performActionsOnShoppingCart({ clickProceedToCheckout: true })
  })
  await test.step('fill shipping details then click on next', async () => {
    await checkoutShippingPage.fillShippingDetails({ signIn: true, email: process.env.EMAIL, password: process.env.PASSWORD, expectedUserAddressDetails });
    await checkoutShippingPage.chooseShippingMethod(shippingMethod);
    await checkoutShippingPage.clickNext();
  })
  await test.step('validate cart subtotal - shipping and order total', async () => {
    await checkoutPaymentPage.validateOrderSummaryExpenses(cartSubtotal, '$45.00');
    await checkoutPaymentPage.validateOrderSummaryExpenses(shipping, '$5.00');
    await checkoutPaymentPage.validateOrderSummaryExpenses(orderTotal, '$50.00');
  })
  await test.step('place order and validate order was successfully done', async () => {
    await checkoutPaymentPage.clickPlaceOrder();
    await checkoutPaymentPage.validatePurchaseConfirmationMessage(purchaseConfirmation);
  })
})