export interface CartActionsOptionalParamsInterface {
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

export interface ProductItemOptionalParamsInterface {
  chooseSize?: boolean,
  itemSize?: string,
  chooseColor?: boolean,
  color?: string,
  validatePrice?: boolean,
  price?: string,
  addItemToCart?: boolean,
}