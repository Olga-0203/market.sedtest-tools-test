import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
  readonly registerLink: Locator;
  readonly emailInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;

  constructor(page) {
    super(page);
    this.registerLink = page.getByText('Еще не зарегистрированы ?');

    // Заменяем локатор для почты на более универсальный и надёжный
    this.emailInput = page.locator('input[name="email"], input[type="email"]');

    this.firstNameInput = this.getByRole('textbox', 'Имя');
    this.lastNameInput = this.getByRole('textbox', 'Фамилия');
    this.phoneInput = this.getByRole('textbox', 'Телефон');
    this.passwordInput = this.getByRole('textbox', 'Пароль');

    this.registerButton = page.getByRole('button', { name: 'Зарегестрироватся' });
  }

  async goto() {
    await this.page.goto('/login', { waitUntil: 'networkidle' });
    await this.registerLink.waitFor({ state: 'visible', timeout: 25000 });
  }

  async openRegistrationForm() {
    await this.registerLink.click();
    // Ожидаем появления хотя бы одного поля формы регистрации, например email
    await this.emailInput.waitFor({ state: 'visible', timeout: 25000 });
  }

  async checkEmptyFields() {
    const fields = [
      { locator: this.emailInput, name: 'Email' },
      { locator: this.firstNameInput, name: 'Имя' },
      { locator: this.lastNameInput, name: 'Фамилия' },
      { locator: this.phoneInput, name: 'Телефон' },
      { locator: this.passwordInput, name: 'Пароль' },
    ];
    for (const { locator, name } of fields) {
      await locator.waitFor({ state: 'visible', timeout: 25000 });
      await expect(locator, `${name} должно быть пустым`).toBeEmpty();
    }
  }

  async fillRegistrationForm(data: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
  }) {
    // Для каждого поля сначала ждем видимости, потом вводим
    await this.emailInput.waitFor({ state: 'visible', timeout: 25000 });
    await this.emailInput.fill(data.email);

    await this.firstNameInput.waitFor({ state: 'visible', timeout: 25000 });
    await this.firstNameInput.fill(data.firstName);

    await this.lastNameInput.waitFor({ state: 'visible', timeout: 25000 });
    await this.lastNameInput.fill(data.lastName);

    await this.phoneInput.waitFor({ state: 'visible', timeout: 25000 });
    await this.phoneInput.fill(data.phone);

    await this.passwordInput.waitFor({ state: 'visible', timeout: 25000 });
    await this.passwordInput.fill(data.password);
  }

  async submit() {
    await this.registerButton.waitFor({ state: 'visible', timeout: 25000 });
    await this.registerButton.click();
  }
}








