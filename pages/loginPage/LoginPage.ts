import { LumaMainPage } from "../LumaMainPage";

export class LoginPage extends LumaMainPage {
  private emailFieldLocator = '[name="login[username]"]';
  private passwordFieldLocator = '[name="login[password]"]';


  public async login(email: string = process.env.EMAIL as string, password: string = process.env.PASSWORD as string) {
    await this.fillText(this.emailFieldLocator, email);
    await this.fillText(this.passwordFieldLocator, password);
    const signInButton = this.page.getByRole('button', { name: 'Sign In' });
    await this.clickElement(signInButton);
  }

  public async clickCreateAnAccountButton() {
    const createAnAccountButon = this.page.getByText('Create an Account', { exact: true })
    await this.clickElement(createAnAccountButon);
  }
} 