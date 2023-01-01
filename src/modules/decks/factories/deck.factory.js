import { faker } from "@faker-js/faker";
import cardFactory from "./card.factory.js";
import uuidToSeed from "../../../shared/utilities/uuid-to-seed.js";

export default function deckFactory({ id } = {}) {
  id ??= faker.string.uuid();
  faker.seed(uuidToSeed(id));
  const cards = faker.helpers
    .multiple(cardFactory, { count: { min: 3, max: 10 } })
    .map((card) => ({ ...card, deckId: id }));
  return {
    id,
    name: faker.lorem.word(),
    cards,
  };
}
