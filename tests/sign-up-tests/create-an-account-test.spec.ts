import { test } from '@helpers';
import { MockGenerator } from '@helpers';


test('sign upand create new user account for luma shopping website', { tag: ['@SIGN_UP'] }, async ({ loadApplication, createAnAccountPage }) => {
  let firstname = MockGenerator.getRandomFirstName();
  let lastname = MockGenerator.getRandomLastName();
  let email = MockGenerator.getRandomEmail();
  let strongPasswordStrength = 'Password Strength: Strong';
  let expectedConfirmationText = 'Thank you for registering with Main Website Store.';
  await test.step('sign up to luma website with all mandatory credentials and validate password is strong and validate register was successful', async () => {
    await createAnAccountPage.createNewCustomerAccount(firstname, lastname, email, strongPasswordStrength, expectedConfirmationText);
  })
})
