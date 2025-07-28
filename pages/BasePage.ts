import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected getByRole(role: string, name?: string): Locator {
    return name ? this.page.getByRole(role, { name }) : this.page.getByRole(role);
  }

  async waitForVisible(locator: Locator, timeout = 25000) {
    await locator.waitFor({ state: 'visible', timeout });
  }
}

