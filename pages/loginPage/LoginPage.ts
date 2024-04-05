import { Page } from "@playwright/test";
import { LumaMainPage } from "../LumaMainPage";
import { ItemShoppingComponentPage } from "../pageComponents/productShoppingComponent/ItemShoppingPage";
import { ClientSideValiationErrorOptionalParamsInterface } from "../../helpers/optionalParamsInterfaces/OptionalParams";

export class LoginPage extends LumaMainPage {
  private emailFieldLocator = '[name="login[username]"]';
  private passwordFieldLocator = '[name="login[password]"]';
  private signInLink = 'Sign In';

  public async login(email: string = process.env.EMAIL as string, password: string = process.env.PASSWORD as string) {
    const emailField = this.page.locator(this.emailFieldLocator);
    const passwordField = this.page.locator(this.passwordFieldLocator);
    const loggedInState = await this.getLoggedInState();
    if (loggedInState === 'not-logged-in') {
      await this.clickOnLink(this.signInLink);
      await this.fillText(emailField, email);
      await this.fillText(passwordField, password);
      const signInButton = this.page.getByRole('button', { name: 'Sign In' });
      await this.clickElement(signInButton);
      await this.page.waitForTimeout(2500);
    }

  }

  public async clickCreateAnAccountButton() {
    const createAnAccountButon = this.page.getByText('Create an Account', { exact: true })
    await this.clickElement(createAnAccountButon);
  }
} 