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

  public async validateBillingAndShippingDetails(billingShippingDetails: string) {
    const shippingDetailsInnerText = await this.getInnerText(this.billingAddressDetailsLocator);
    expect(shippingDetailsInnerText).toBe(billingShippingDetails);
  }

  public async validateOrderSummaryExpenses(tableRowText: string, expectedOrderTotal: string) {
    const orderSummaryTable = this.page.locator(`${this.orderSummaryTableLocator} tbody tr`, { hasText: tableRowText });
    const orderSummaryCell = orderSummaryTable.locator('td');
    const orderSummaryCellInnerText = await this.getInnerText(orderSummaryCell);
    expect(orderSummaryCellInnerText).toBe(expectedOrderTotal);
  }

  public async clickPlaceOrder() {
    await this.submit();
  }

  public async validatePurchaseConfirmationMessage(purchaseConfirmation: string) {
    await this.validateCurrentPageTitle(purchaseConfirmation)
  }
}