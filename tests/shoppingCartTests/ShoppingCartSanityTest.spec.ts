import { SideBarShoppingItemListEnum } from '../../common/componentEnums/SideBarShoppingItemListEnum';
import { SideBarShoppingOptionsEnum } from '../../common/componentEnums/SideBarShoppingOptionsEnum';
import { MenuBar } from '../../common/navigationEnums/menuBar/MenuBarEnum'
import { MenuBarCategories } from '../../common/navigationEnums/menuBarCategories/MenuBarCategories';
import { MenuBarSubCategories } from '../../common/navigationEnums/menuBarSubCategories/MenuBarSubCategories';
import { test } from '../../helpers/fixtures/customFixtures/CustomFixtures'
import { CartActionsEnum } from '../../pages/cartPage/ShoppingCartPage';

test('test cart functionality behaves as expected', { tag: ['@SANITY'] }, async ({ loadApplication, shoppingCartPage, productPage, womenCategoryPage, checkoutShippingPage, checkoutPaymentPage }) => {
  let jacketName: string = 'Stark Fundamental Hoodie';
  let jacketColor: string = 'Blue';
  let jacketSize: string = 'L';
  let cartInitialPrice: string = '$42.00';
  let cartUpdatedPrice: string = '$84.00';
  let shippingTotalPrice: string = '';
  let itemInStock: string = 'In Stock';
  let updateQty: string = '2';
  let shippingMethod: string = 'Best Way';
  let orderTotal: string = 'Order Total';
  let updatedSize: string = 'XL'
  let purchaseConfirmation: string = 'Thank you for your purchase!';
  let expectedUserAddressDetails: string[] = ['John Doe', 'Jump Street 20', 'Miami, Florida 1000 P.O', 'United States', '55555'];
  await test.step('navigaet to mens category, hover over tops and choose hoodies and sweatshirts sub category', async () => {
    await womenCategoryPage.chooseMenuBarOption(MenuBar.MEN);
    await womenCategoryPage.chooseMenuCategory(MenuBarCategories.TOPS);
    await womenCategoryPage.chooseMenuSubCategory(MenuBarSubCategories.HOODIES_AND_SWEATSHIRTS);
  })
  await test.step('choose sweatshirt nylon material from sidebar shopping options then select sweathsirt color, size and add it to cart', async () => {
    await womenCategoryPage.sideBarShoppingComponent.chooseSideBarShoppingOption(SideBarShoppingOptionsEnum.MATERIAL, SideBarShoppingItemListEnum.NYLON);
    await womenCategoryPage.itemShoppingComponent.chooseProductItem(jacketName, { chooseColor: true, color: jacketColor, chooseSize: true, size: jacketSize, addItemToCart: true });
  })
  await test.step('click to view and edit cart', async () => {
    await womenCategoryPage.performActionsOnShoppingCart({ viewAndEditCart: true })
  })
  await test.step('validate cart subtotal price then click to edit the cart item', async () => {
    await shoppingCartPage.validateCartTotal(cartInitialPrice);
    await shoppingCartPage.modifyCartItem(CartActionsEnum.EDIT, jacketName);
  })
  await test.step('validate the item is in stock and change the quantity to 2 then click on update cart', async () => {
    await productPage.validateProductStockAvailability(itemInStock);
    await productPage.itemShoppingPage.chooseProductItem(jacketName, { modifyQuantity: true, quantity: updateQty, chooseSize: true, size: updatedSize });
    await productPage.updateCart();
  })
  await test.step('validate price changed after adding another quantity then proceed to checkout', async () => {
    await shoppingCartPage.validateCartTotal(cartUpdatedPrice);
    await shoppingCartPage.proceedToCheckout();
  })
  await test.step(' sign in then valdate shipping address details - choose shipping method and click on next', async () => {
    await checkoutShippingPage.fillShippingDetails({ signIn: true, email: process.env.EMAIL, password: process.env.PASSWORD, expectedUserAddressDetails, shippingMethod });
    await checkoutShippingPage.clickNext();
  })
  await test.step('validate cart subtotal then place order and validate order was successfully made', async () => {
    await checkoutPaymentPage.validateOrderSummaryExpenses(orderTotal, '$114.00');
    await checkoutPaymentPage.clickPlaceOrder();
    await checkoutPaymentPage.validatePurchaseConfirmationMessage(purchaseConfirmation);
  })
})