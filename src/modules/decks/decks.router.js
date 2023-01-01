import { getDecks, getDeck } from "./decks.controller.js";

import apiRouter from "../../shared/utilities/api-router.js";

const decksRouter = apiRouter();

decksRouter.get("/", getDecks, { authenticate: true });
decksRouter.get("/:id", getDeck, { authenticate: true });

export default decksRouter.router;
