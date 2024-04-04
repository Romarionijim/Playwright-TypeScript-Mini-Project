export interface PerformActionsOptions {
  validateItemCartCount?: boolean;
  clickProceedToCheckout?: boolean;
  validateItemCartSubtotal?: boolean;
  modifyItemQuantity?: boolean;
  clickOnEditPencilIcon?: boolean;
  removeItemFromCart?: boolean;
  viewAndEditCart?: boolean;
  expectedEmptyShoppingCartCaption?: string;
  cartTotalItems?: number;
  expectedSubTotalPrice?: string;
  itemText?: string;
  itemQuantity?: string;
}