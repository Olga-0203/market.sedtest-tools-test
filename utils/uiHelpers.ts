// utils/uiHelpers.ts
import { Locator, expect } from '@playwright/test';

/**
 * Проверяет, что все поля видимы, пустые и активные
 */
export async function validateEmptyFields(fields: Array<{ locator: Locator; name: string }>) {
  for (const { locator, name } of fields) {
    await expect(locator, `${name} должно быть видно`).toBeVisible();
    await expect(locator, `${name} должно быть пустым`).toBeEmpty();
    await expect(locator, `${name} должно быть доступно для ввода`).toBeEnabled();
  }
}

/**
 * Заполняет поле testValue и проверяет, затем очищает
 */
export async function testFieldFillClear(field: Locator, testValue: string, fieldName: string) {
  await field.fill(testValue);
  await expect(field, `${fieldName} должно содержать значение`).toHaveValue(testValue);
  await field.clear();
  await expect(field, `${fieldName} должно быть очищено`).toBeEmpty();
}

/**
 * Проверяет видимость и текст кнопки
 */
export async function validateButton(locator: Locator, expectedText: string) {
  await expect(locator).toBeVisible();
  await expect(locator).toHaveText(expectedText);
}

/**
 * Проверка поля телефона с учетом форматирования
 */
export async function validateFormattedPhoneField(field: Locator, inputValue: string, fieldName: string) {
  await field.fill(inputValue);
  const actualValue = await field.inputValue();

  // Проверяем, что значение не пустое и содержит цифры
  expect(actualValue.length, `${fieldName} должно содержать значение`).toBeGreaterThan(0);
  const digits = actualValue.replace(/\D/g, '');
  expect(digits.length, `${fieldName} должно содержать цифры`).toBeGreaterThan(7);
  // Проверяет наличие кода страны +7 или просто 7
  expect(actualValue, `${fieldName} должно содержать код страны`).toMatch(/[\+]?7/);
}

