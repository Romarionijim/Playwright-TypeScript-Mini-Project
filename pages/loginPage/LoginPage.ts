import { LumaMainPage } from "../LumaMainPage";

export class LoginPage extends LumaMainPage {
  private emailFieldLocator = '[name="login[username]"]';
  private passwordFieldLocator = '[name="login[password]"]';
  private signInLink = 'Sign In';


  public async login(email: string = process.env.EMAIL as string, password: string = process.env.PASSWORD as string) {
    const loggedInState = await this.getLoggedInState();
    try {
      if (loggedInState === 'not-logged-in') {
        console.log('EMAIL:', process.env.EMAIL);
        console.log('PASSWORD:', process.env.PASSWORD);
        await this.clickOnLink(this.signInLink);
        await this.fillText(this.emailFieldLocator, email);
        await this.fillText(this.passwordFieldLocator, password);
        const signInButton = this.page.getByRole('button', { name: 'Sign In' });
        await this.clickElement(signInButton);
      }
    } catch (error) {
      throw new Error('your trying to login but the user is already logged in')
    }
  }

  public async clickCreateAnAccountButton() {
    const createAnAccountButon = this.page.getByText('Create an Account', { exact: true })
    await this.clickElement(createAnAccountButon);
  }
} 