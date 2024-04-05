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
}
