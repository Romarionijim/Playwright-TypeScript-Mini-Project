import { expect } from "@playwright/test";
import { LumaMainPage } from "../LumaMainPage";

export class CreateAnAccountPage extends LumaMainPage {
  private firstNameFieldLocator = '#firstname';
  private lastNameFieldLocator = '#lastname';
  private emailFieldLocator = '#email_address';
  private passwordFieldLocator = '[title="Password"]'
  private confirmPasswordLocator = '#password-confirmation';
  private passwordStrengthLocator = '#password-strength-meter-container';
  private createAnAccountButtonName = 'Create an Account';

  public async clickCreateAnAccount() {
    await this.clickOnLink(this.createAnAccountButtonName);
  }

  public async fillFirstName(firstName: string) {
    await this.fillText(this.firstNameFieldLocator, firstName);
  }

  public async fillLastName(lastName: string) {
    await this.fillText(this.lastNameFieldLocator, lastName);
  }

  public async fillEmail(email: string) {
    await this.fillText(this.emailFieldLocator, email);
  }

  public async fillPassword(password: string = process.env.PASSWORD as string) {
    await this.fillText(this.passwordFieldLocator, password);
  }

  public async confirmPassword(password: string) {
    await this.fillText(this.confirmPasswordLocator, password);
  }

  public async validatePasswordStrength(expectedPasswordStrength: string) {
    const passwordStrength = await this.getInnerText(this.passwordStrengthLocator);
    expect(passwordStrength).toBe(expectedPasswordStrength);
  }

  public async createNewCustomerAccount(firstname: string, lastname: string, email: string, passwordStrengh: string, password: string = process.env.PASSWORD as string) {
    await this.clickCreateAnAccount();
    await this.fillFirstName(firstname);
    await this.fillLastName(lastname);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.confirmPassword(password);
    await this.validatePasswordStrength(passwordStrengh);
  }
}