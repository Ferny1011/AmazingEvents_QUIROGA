import data from "./amazing.js";
import { createDetails } from "./functions.js";
const detailsContainer = document.querySelector(".container-card");
const queryString = location.search;
const params = new URLSearchParams(queryString);
const cardId = params.get("id");
const card = data.events.find(event => event._id == cardId);
createDetails(card, detailsContainer);
