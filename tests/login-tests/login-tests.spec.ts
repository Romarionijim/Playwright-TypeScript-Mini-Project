import { test } from '@helpers'

let clientSideValidationErrorsCount: number
let zeroBasedIndex: number;
let validationErrorText: string;

test('login to Luma shopping website', { tag: ['@LOGIN'] }, async ({ loginPage }) => {
  await test.step('login to luma shopping website by providing email and password and validate user is logged in', async () => {
    const expecetdLoggedInUser: string = 'John Doe'
    await loginPage.loadApp();
    await loginPage.login();
    await loginPage.validateLoggedInUser(expecetdLoggedInUser);
  })
})

test('login with empty email', { tag: ['@LOGIN'] }, async ({ loginPage }) => {
  clientSideValidationErrorsCount = 1
  zeroBasedIndex = 0
  validationErrorText = 'This is a required field.';
  await test.step('login to luma by typing an empty email', async () => {
    await loginPage.loadApp();
    await loginPage.login('', undefined, { negativeTest: true, expectedErrorCount: clientSideValidationErrorsCount, validationErrorsIndexes: [zeroBasedIndex], isEmptyFieldPresent: true, emptyFieldsIndexes: [zeroBasedIndex], validationErrorTextList: [validationErrorText] });
  })
})

test('login with empty password', { tag: ['@LOGIN'] }, async ({ loginPage }) => {
  clientSideValidationErrorsCount = 1
  zeroBasedIndex = 1
  validationErrorText = 'This is a required field.';
  await test.step('login to luma by typing an empty password', async () => {
    await loginPage.loadApp();
    await loginPage.login(undefined, '', { negativeTest: true, expectedErrorCount: clientSideValidationErrorsCount, validationErrorsIndexes: [zeroBasedIndex], isEmptyFieldPresent: true, emptyFieldsIndexes: [zeroBasedIndex], validationErrorTextList: [validationErrorText] });
  })
})

test('login with empty email and empty password', { tag: ['@LOGIN'] }, async ({ loginPage }) => {
  clientSideValidationErrorsCount = 2
  let firstIndex: number = 0;
  let secondIndex: number = 1
  validationErrorText = 'This is a required field.';
  await test.step('login by leaving email and password fields empty and validate the number of errors and their caption', async () => {
    await loginPage.loadApp();
    await loginPage.login('', '', { negativeTest: true, expectedErrorCount: clientSideValidationErrorsCount, validationErrorsIndexes: [firstIndex, secondIndex], isEmptyFieldPresent: true, emptyFieldsIndexes: [firstIndex, secondIndex], validationErrorTextList: [validationErrorText, validationErrorText] });
  })
})

test('login with invalid email', { tag: ['@LOGIN'] }, async ({ loginPage }) => {
  clientSideValidationErrorsCount = 1
  zeroBasedIndex = 0
  validationErrorText = 'Please enter a valid email address (Ex: johndoe@domain.com).';
  await test.step('login by typing an invalid email with a correct password and validate incorrect email validation error', async () => {
    await loginPage.loadApp();
    await loginPage.login('invalidEmail', undefined, { negativeTest: true, expectedErrorCount: clientSideValidationErrorsCount, validationErrorsIndexes: [zeroBasedIndex], validationErrorTextList: [validationErrorText] })
  })
})

test('login with invalid password', { tag: ['@LOGIN'] }, async ({ loginPage }) => {
  await test.step('login by typing an invalid email with a correct password and validate incorrect email validation error', async () => {
    await loginPage.loadApp();
    await loginPage.login(undefined, 'invalid password');
    validationErrorText = 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.';
    await loginPage.validateCurrentTopPageMessage(validationErrorText);
  })
})