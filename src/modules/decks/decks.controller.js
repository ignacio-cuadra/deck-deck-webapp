import { faker } from "@faker-js/faker";
import Deck from "./models/deck.model.js";
import deckFactory from "./factories/deck.factory.js";

export async function getDecks(req, res) {
  // const decks = await Deck.findAll();
  const decks = faker.helpers.multiple(deckFactory, {
    count: { min: 3, max: 10 },
  });
  return res.status(200).json({
    status: "success",
    data: { decks },
  });
}
export async function getDeck(req, res) {
  // const deck = await Deck.findByPk(req.params.id);
  const deck = deckFactory({ id: req.params.id });
  return res.status(200).json({
    status: "success",
    data: { deck },
  });
}
