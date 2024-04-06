import { faker } from '@faker-js/faker';

export default class Randomizer {

    public static getRandomFirstName(): string {
        return faker.person.firstName();
    }

    public static getRandomLastName(): string {
        return faker.person.lastName();
    }

    public static getRandomEmail(): string {
        return faker.internet.email();
    }

    public static getRandomWords(): string {
        return faker.word.words();
    }

    public static getRandomDomainWords(): string {
        return faker.internet.domainWord();
    }

    public static getRandomNumbers(): number {
        return faker.datatype.number({ min: 1, max: 1000 });
    }

    public static getRandomCompanyName(): string {
        return faker.company.name();
    }

    public static getRandomCityName(): string {
        return faker.location.city();
    }

    public static getRandomStreetAddress(): string {
        return faker.location.streetAddress();
    }

    public static getRandomPostalCode(): string {
        return faker.location.zipCode();
    }

    public static getRandomCountry(): string {
        return faker.location.country();
    }

    public static getRandomPhoneNumber(): string {
        return faker.phone.number();
    }

    public static getRandomState() {
        return faker.location.state();
    }
}
