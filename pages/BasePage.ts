import { Locator, Page } from "@playwright/test";

export class BasePage {
  constructor(public page: Page) {
    this.page = page;
  }

  /**
   * @description get's the type of the locator - if it is a string then convert it to a locator else perform the action directly on that locator
   * @param locator 
   */
  private async getTypeOfLocator(element: (string | Locator)) {
    const locatorElement = element as Locator
    if (typeof element === 'string') {
      return this.page.locator(element)
    } else if (element === locatorElement) {
      return element;
    } else {
      throw new Error(`type of locator: ${element} must be a of type string or Locator`)
    }
  }

  public async clickElement(locator: (string | Locator)) {
    const locatorElement = await this.getTypeOfLocator(locator);
    await locatorElement.click({ force: true });
    await locatorElement.scrollIntoViewIfNeeded();
  }

  public async fillText(locator: (string | Locator), text: string) {
    const locatorElement = await this.getTypeOfLocator(locator);
    locatorElement.click()
    locatorElement.fill(text)
  }

  public async hover(locator: (string | Locator)) {
    const locatorElement = await this.getTypeOfLocator(locator);
    await locatorElement.hover();
  }

  /**
   * @description applies to checkboxes and radio buttons
   * @param label 
   */
  public async changeCheckBoxState(label: string) {
    const checkBox = this.page.getByLabel(label);
    const isChecked = await checkBox.isChecked();
    if (isChecked) {
      await checkBox.uncheck();
    } else {
      await checkBox.check();
    }
  }

  public async goto(url: (string | undefined) = process.env.BASE_URL) {
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
   * @description get locator innerText or inputValue based on the provided html tag for that element
   */
  public async getElementInnerTextOrInputValue(locator: (string | Locator)) {
    const locatorElement = await this.getTypeOfLocator(locator);
    if (await locatorElement.evaluate(el => el.tagName === 'input')) {
      return (await locatorElement.inputValue()).trim();
    } else {
      return (await locatorElement.innerText()).trim();
    }
  }
}