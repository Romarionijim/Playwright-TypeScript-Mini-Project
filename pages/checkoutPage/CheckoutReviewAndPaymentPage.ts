import { expect } from "@playwright/test";
import { LumaMainPage } from "../LumaMainPage";

export class CheckoutReviewAndPaymentPage extends LumaMainPage {
  private billingAddressDetailsLocator = '[class="billing-address-details"]'
  private orderSummaryTableLocator = '[class="opc-block-summary"] [class="data table table-totals"]';
  private cartItemsTotalLocator = '[class="content minicart-items"] [class="product"]';

  public async confirmBillingAndShippingAddress(confirmationLabel: string) {
    try {
      await this.changeCheckBoxState(confirmationLabel);
    } catch (error) {
      throw new Error(error)
    }
  }

  public async validateBillingAndShippingDetails(billingShippingDetails: string[]) {
    const shippingDetailsInnerText = await this.getInnerText(this.billingAddressDetailsLocator);
    const shippingDetailsList = shippingDetailsInnerText.split('\n')
    shippingDetailsList.splice(shippingDetailsList.indexOf('edit'), 1);
    expect(shippingDetailsList).toEqual(billingShippingDetails);
  }

  public async validateOrderSummaryExpenses(tableRowText: string, expectedOrderTotal: string) {
    const orderSummaryTable = this.page.locator(`${this.orderSummaryTableLocator} tbody tr`, { hasText: tableRowText });
    const orderSummaryCell = orderSummaryTable.locator('td');
    const orderSummaryCellInnerText = await this.getInnerText(orderSummaryCell);
    expect(orderSummaryCellInnerText).toBe(expectedOrderTotal);
  }

  public async clickPlaceOrder() {
    await this.clickOnButtonWithRole('Place Order');
  }

  public async validatePurchaseConfirmationMessage(purchaseConfirmation: string) {
    await this.validateCurrentPageTitle(purchaseConfirmation)
  }
}