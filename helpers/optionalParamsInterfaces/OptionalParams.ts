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
  cartRemovalDialogButtonRole?: string
}

export interface ProductItemOptionalParamsInterface {
  chooseSize?: boolean,
  size?: string,
  chooseColor?: boolean,
  color?: string,
  validatePrice?: boolean,
  price?: string,
  addItemToCart?: boolean,
  modifyQuantity?: boolean,
  quantity?: string,
}

export interface ClientSideValiationErrorOptionalParamsInterface {
  isEmptyFieldPresent?: boolean,
  allValidationErrorsText?: string,
  emptyFieldsIndexes?: number[],
  validationErrorsIndexes?: number[],
  validationErrorTextList?: string[],
}

export interface UserShippingDetailsParams {
  company?: string,
  streetAddress?: string,
  streetFieldIndex?: number,
  city?: string,
  state?: string,
  postalCode?: string,
  country?: string,
  phoneNumber?: string,
  shippingMethod?: string,
  firstname?: string,
  lastname?: string
}