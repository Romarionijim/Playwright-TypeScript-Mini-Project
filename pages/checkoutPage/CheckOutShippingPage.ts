import { LumaMainPage } from "../LumaMainPage";

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

  public async fillShippingDetails(company: string, streetAddress: string, streetFieldindex: number, city: string, state: string,
    postalCode: string, country: string, phoneNumber: string, shippingMethod: string, options?: { signIn?: boolean, email?: string, password?: string, firstname?: string, lastname?: string }) {
    if (options?.signIn && options.email !== undefined && options.password !== undefined) {
      await this.signIn(options.email, options.password)
      await this.page.waitForTimeout(2500);
    } else if (options?.email !== undefined && options.firstname !== undefined && options.lastname !== undefined) {
      await this.fillEmailAddress(options?.email!);
      await this.fillFirstName(options?.firstname!);
      await this.fillLastName(options?.lastname!);
    }
    await this.fillCompanyName(company);
    await this.fillStreetAddress(streetFieldindex, streetAddress);
    await this.fillCityName(city);
    await this.selectState(state)
    await this.fillPostalCode(postalCode);
    await this.selectCountry(country);
    await this.fillPhoneNumber(phoneNumber);
    await this.chooseShippingMethod(shippingMethod);
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
    await this.submit();
  }

  public async chooseShippingMethod(tableRowText: string) {
    const shippingMethodTable = this.page.locator(this.shippingMethodTableLocator);
    const shippingMethodRow = this.page.locator(`${shippingMethodTable} tbody tr`, { hasText: tableRowText });
    const shippingMethodRadioButton = shippingMethodRow.locator('input[type="radio"]');
    await this.clickElement(shippingMethodRadioButton);
  }

  public async clickNext() {
    await this.submit();
  }
}