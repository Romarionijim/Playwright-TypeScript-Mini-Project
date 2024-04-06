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
  size?: string,
  chooseColor?: boolean,
  color?: string,
  validatePrice?: boolean,
  price?: string,
  addItemToCart?: boolean,
}

export interface ClientSideValiationErrorOptionalParamsInterface {
  isEmptyFieldPresent?: boolean,
  allValidationErrorsText?: string,
  emptyFieldsIndexes?: number[],
  validationErrorsIndexes?: number[],
  validationErrorTextList?: string[],
}