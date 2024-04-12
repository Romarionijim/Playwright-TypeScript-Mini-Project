import { expect } from "@playwright/test";
import { LumaMainPage } from "../LumaMainPage";
import { UserShippingDetailsParams } from "../../helpers/optionalParamsInterfaces/OptionalParams";


export class CheckoutShippingPage extends LumaMainPage {
  private emailFieldLocator = '#customer-email-fieldset #customer-email';
  private firstnameFieldLocator = '[name="firstname"]';
  private lastnameFieldLocator = '[name="lastname"]';
  private passwordFieldLocator = '#customer-password';
  private companyFieldLocator = '[name="company"]';
  private cityFieldLocator = '[name="city"]';
  private stateFieldLocator = '[name="region_id"]';
  private postalCodeLocator = '[name="postcode"]';
  private countryFieldLocator = '[name="country_id"]';
  private phoneNumberFieldLocator = '[name="telephone"]';
  private shippingMethodTableLocator = '#checkout-shipping-method-load';
  private signinEmailAddressLocator = '#login-email';
  private signinPasswordLocator = '#login-password';
  private existingAddressLocator = '[class="shipping-address-item selected-item"]';

  /**
   * @description this function fills the shipping details if the user is not signed in already otherwise validate the populated existing address.
   * if the user does not sign in - user must fill firstname, lastname and email address.
   * @param company 
   * @param streetAddress 
   * @param streetFieldindex 
   * @param city 
   * @param state 
   * @param postalCode 
   * @param country 
   * @param phoneNumber 
   * @param shippingMethod 
   * @param options 
   */
  public async fillShippingDetails(options?: { signIn?: boolean, email?: string, password?: string, expectedUserAddressDetails?: string[] } & UserShippingDetailsParams) {
    if (options?.signIn && options.email !== undefined && options.password !== undefined) {
      await this.signIn(options.email, options.password)
      await this.page.waitForTimeout(2500);
    } else if (options?.email !== undefined && options.firstname !== undefined && options.lastname !== undefined) {
      await this.fillEmailAddress(options?.email!);
      await this.fillFirstName(options?.firstname!);
      await this.fillLastName(options?.lastname!);
    }
    const existingUserAddressDetails = this.page.locator(this.existingAddressLocator);
    const isUserAddressDetailsVisibile = await existingUserAddressDetails.isVisible()
    if (isUserAddressDetailsVisibile) {
      const addressDetails = await this.getAddressDetailsList();
      expect(addressDetails).toEqual(options?.expectedUserAddressDetails);
    } else {
      await this.fillCompanyName(options?.company!);
      await this.fillStreetAddress(options?.streetFieldIndex!, options?.streetAddress!);
      await this.fillCityName(options?.city!);
      await this.selectState(options?.state!)
      await this.fillPostalCode(options?.postalCode!);
      await this.selectCountry(options?.country!);
      await this.fillPhoneNumber(options?.phoneNumber!);
      await this.chooseShippingMethod(options?.shippingMethod!);
    }
  }

  public async fillEmailAddress(email: string) {
    await this.fillText(this.emailFieldLocator, email);
  }

  public async fillFirstName(firstName: string) {
    await this.fillText(this.firstnameFieldLocator, firstName);
  }

  public async fillLastName(lastName: string) {
    await this.fillText(this.lastnameFieldLocator, lastName);
  }

  public async fillCompanyName(company: string) {
    await this.fillText(this.companyFieldLocator, company)
  }
  public async fillStreetAddress(streetFieldIndex: number, streetAddress: string) {
    const streetFieldLocator = this.page.locator(`[name="street[${streetFieldIndex}]"]`)
    await this.fillText(streetFieldLocator, streetAddress);
  }

  public async fillCityName(city: string) {
    await this.fillText(this.cityFieldLocator, city)
  }

  public async selectState(state: string) {
    await this.selectOption(this.stateFieldLocator, { label: state });
  }

  public async fillPostalCode(postalCode: string) {
    await this.fillText(this.postalCodeLocator, postalCode);
  }

  public async selectCountry(country: string) {
    await this.selectOption(this.countryFieldLocator, { label: country })
  }

  public async fillPhoneNumber(phoneNumber: string) {
    await this.fillText(this.phoneNumberFieldLocator, phoneNumber);
  }

  public async signIn(email: string, password: string) {
    const signInButton = this.page.getByRole('button', { name: 'Sign In' })
    await this.clickElement(signInButton);
    await this.fillText(this.signinEmailAddressLocator, email);
    await this.fillText(this.signinPasswordLocator, password);
    const lastButon = this.page.locator('button', { hasText: 'Sign In' })
    await this.clickElement(signInButton.nth(1));
  }

  public async chooseShippingMethod(tableRowText: string) {
    const shippingMethodTableRow = this.page.locator(`${this.shippingMethodTableLocator} tbody tr`, { hasText: tableRowText });
    const shippingMethodRadioButton = shippingMethodTableRow.locator('input[type="radio"]');
    await this.changeCheckBoxState(shippingMethodRadioButton)
  }

  public async clickNext() {
    await this.clickOnButtonWithRole('Next');
  }

  private async getAddressDetailsList() {
    const addressDetailsInnerText = await this.getInnerText(this.existingAddressLocator);
    const addressDetailsList = addressDetailsInnerText.split('\n');
    return addressDetailsList;
  }
}