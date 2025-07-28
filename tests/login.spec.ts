import { test, expect } from '../fixtures/fixtures';

test.describe('Авторизация на сайте', () => {
  const loginCases = [
    { email: 'xd3el@mechanicspedia.com', password: 'xd3el@mechanicspedia.com', description: 'валидные данные' },
    { email: '', password: 'password', description: 'пустой email' },
    { email: 'user@example.com', password: '', description: 'пустой пароль' },
    { email: 'invalid-email', password: 'password', description: 'невалидный email' },
    { email: 'xd3el@mechanicspedia.com', password: '123', description: 'слишком короткий пароль' },
  ];

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  for (const { email, password, description } of loginCases) {
    test(`Проверка авторизации с ${description}`, async ({ loginPage }) => {
      await loginPage.login(email, password);
      await expect(loginPage.loginButton).toBeVisible();
    });
  }
});













