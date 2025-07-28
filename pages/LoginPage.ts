// pages/LoginPage.ts
import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page) {
    super(page);

    this.emailInput = this.getByRole('textbox', 'Почта');
    this.passwordInput = this.getByRole('textbox', 'Пароль');
    this.loginButton = this.page.locator('button:has-text("Войти")').first();
  }

  async goto() {
    await this.page.goto('/login', { waitUntil: 'networkidle' });
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.loginButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  async fillEmail(email: string) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveValue(password);
  }

  async submit() {
    await this.loginButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }
}








