import { faker } from "@faker-js/faker";

export default function cardFactory() {
  return {
    id: faker.string.uuid(),
    front: faker.lorem.word(),
    back: faker.lorem.sentence({ min: 1, max: 10 }),
  };
}
