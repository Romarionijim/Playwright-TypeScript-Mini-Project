import { test } from '../../helpers/fixtures/customFixtures/CustomFixtures'
import Randomizer from '../../helpers/faker/FakeDataRandomizer';


test('sign upand create new user account for luma shopping website', { tag: ['@SIGN_UP'] }, async ({ loadApplication, createAnAccountPage }) => {
  let firstname = Randomizer.getRandomFirstName();
  let lastname = Randomizer.getRandomLastName();
  let email = Randomizer.getRandomEmail();
  let strongPasswordStrength = 'Password Strength: Strong';
  await test.step('sign up to luma website with all mandatory credentials and validate password is strong', async () => {
    await createAnAccountPage.createNewCustomerAccount(firstname, lastname, email, strongPasswordStrength);
  })
})
