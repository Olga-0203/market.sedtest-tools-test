// tests/ui-components-validation.spec.ts
import { test } from '../fixtures/fixtures';
import {
  validateEmptyFields,
  testFieldFillClear,
  validateButton,
  validateFormattedPhoneField,
} from '../utils/uiHelpers';

const TEST_DATA = {
  validEmail: 'test@example.com',
  validPassword: 'password123',
  validPhone: '+7 (999) 123-45-67',
  validFirstName: 'Иван',
  validLastName: 'Иванов',
  registrationData: {
    email: 'user@example.com',
    firstName: 'Петр',
    lastName: 'Петров',
    phone: '+7 (999) 123-45-67',
    password: 'SecurePass123',
  },
};

test.describe('UI Components Validation', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Проверка начального состояния полей формы входа', async ({ loginPage }) => {
    await validateEmptyFields([
      { locator: loginPage.emailInput, name: 'Email' },
      { locator: loginPage.passwordInput, name: 'Пароль' },
    ]);
    await validateButton(loginPage.loginButton, 'Войти');
  });

  test('Тестирование заполнения и очистки Email и Пароля в форме входа', async ({ loginPage }) => {
    await testFieldFillClear(loginPage.emailInput, TEST_DATA.validEmail, 'Email');
    await testFieldFillClear(loginPage.passwordInput, TEST_DATA.validPassword, 'Пароль');
  });

  test('Проверка формы регистрации - открытие и пустые поля', async ({ registrationPage }) => {
    await registrationPage.goto();
    await registrationPage.openRegistrationForm();
    await registrationPage.checkEmptyFields();
  });

  test('Заполнение формы регистрации корректными данными', async ({ registrationPage }) => {
    await registrationPage.goto();
    await registrationPage.openRegistrationForm();

    await registrationPage.fillRegistrationForm(TEST_DATA.registrationData);
    await registrationPage.submit();

    // Проверки значений после заполнения (с учетом форматирования телефона)
    await testFieldFillClear(registrationPage.emailInput, TEST_DATA.registrationData.email, 'Email');
    await testFieldFillClear(registrationPage.firstNameInput, TEST_DATA.registrationData.firstName, 'Имя');
    await testFieldFillClear(registrationPage.lastNameInput, TEST_DATA.registrationData.lastName, 'Фамилия');

    // Для телефона отдельная проверка форматирования
    await validateFormattedPhoneField(
      registrationPage.phoneInput,
      TEST_DATA.registrationData.phone,
      'Телефон'
    );

    // Пароль
    await testFieldFillClear(registrationPage.passwordInput, TEST_DATA.registrationData.password, 'Пароль');
  });

  test('Проверка кнопки Войти после попытки логина с пустыми/невалидными данными', async ({ loginPage }) => {
    const cases = [
      { email: '', password: '', description: 'пустые email и пароль' },
      { email: 'invalid-email', password: TEST_DATA.validPassword, description: 'некорректный email' },
      { email: TEST_DATA.validEmail, password: '', description: 'пустой пароль' },
    ];

    for (const c of cases) {
      await test.step(`Проверка логина: ${c.description}`, async () => {
        await loginPage.fillEmail(c.email);
        await loginPage.fillPassword(c.password);
        await loginPage.submit();

        // Проверяем, что кнопка "Войти" видна (ошибка авторизации)
        await validateButton(loginPage.loginButton, 'Войти');
      });
    }
  });

  // Можно добавить дополнительные проверки производительности, адаптивности, CSS свойств и т.п. по аналогии

});
