import { Locator, Page } from "@playwright/test";

export class BasePage {
  constructor(public page: Page) {
    this.page = page;
  }

  /**
   * @description get's the type of the locator - if it is a string then convert it to a locator else perform the action directly on that locator
   * @param locator 
   */
  private async getTypeOfLocator(locator: (string | Locator)) {
    const locatorElement = locator as Locator
    if (typeof locator === 'string') {
      return this.page.locator(locator)
    } else if (locator === locatorElement) {
      return locator;
    } else {
      throw new Error(`type of locator: ${locator} must be a of type string or Locator`)
    }
  }

  public async clickElement(locator: (string | Locator)) {
    const locatorElement = await this.getTypeOfLocator(locator);
    await locatorElement.click({ force: true });
  }

  public async fillText(locator: (string | Locator), text: string) {
    const locatorElement = await this.getTypeOfLocator(locator);
    await locatorElement.click()
    await locatorElement.fill(text)
  }

  public async hover(locator: (string | Locator)) {
    const locatorElement = await this.getTypeOfLocator(locator);
    await locatorElement.hover();
  }

  /**
   * @description applies to checkboxes and radio buttons
   * @param label 
   */
  public async changeCheckBoxState(locator: (string | Locator)) {
    const checkBox = await this.getTypeOfLocator(locator)
    const isChecked = await checkBox.isChecked();
    if (!isChecked) {
      await checkBox.check();
    } else {
      await checkBox.uncheck();
    }
  }

  public async loadApp(url: (string | undefined) = process.env.BASE_URL) {
    if (url !== undefined) {
      await this.page.goto(url);
    } else {
      throw new Error(` the url: ${url} is undefined`)
    }
  }

  public async clearText(locator: (string | Locator)) {
    const locatorElement = await this.getTypeOfLocator(locator);
    await locatorElement.clear();
  }

  public async countElement(locator: (string | Locator)) {
    const locatorElement = await this.getTypeOfLocator(locator);
    const locatorCount = await locatorElement.count();
    return locatorCount;
  }

  /**
   * @description get element innerText or inputValue based on the provided html tag for that element
   */
  public async getInnerText(locator: (string | Locator)) {
    const locatorElement = await this.getTypeOfLocator(locator);
    if (await locatorElement.evaluate(el => el.tagName.toLowerCase() === 'input')) {
      return (await locatorElement.inputValue()).trim();
    } else {
      return (await locatorElement.innerText()).trim();
    }
  }

  public async pressEnter() {
    await this.page.keyboard.press('Enter');
  }

  public async getPageUrl() {
    const pageUrl = this.page.url;
    return pageUrl;
  }

  /**
   * @description clicks on the relevant link (a href element)
   */
  public async clickOnLink(linkName: string) {
    const targetLink = this.page.getByRole('link', { name: linkName });
    await this.clickElement(targetLink);
  }

  public async waitForElementToBeVisible(locator: (string | Locator)) {
    let locatorType = await this.getTypeOfLocator(locator);
    await locatorType.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * @description applied to select elements
   */
  public async selectOption(locator: (string | Locator), options?: { label?: string, value?: string }) {
    const selectLocator = await this.getTypeOfLocator(locator);
    if (options?.label !== undefined) {
      await selectLocator.selectOption({ label: options.label })
    } else if (options?.value !== undefined) {
      await selectLocator.selectOption({ value: options.value });
    } else {
      throw new Error(`the label or value may not be provided properly - please refer to function "selectOption" `)
    }
  }

  /**
   * @description applies to every button that has the type of submit e.g "<button type=submit></button>""
   */
  public async clickOnButtonWithRole(buttonName: string) {
    const submitButton = this.page.getByRole('button', { name: new RegExp(`^\\${buttonName}\\b$`, 'i') });
    await this.clickElement(submitButton);
  }
}