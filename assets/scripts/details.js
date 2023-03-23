import { createDetails, downloadData } from "./functions.js";


const data = await downloadData();
const detailsContainer = document.querySelector(".container-card");
const queryString = location.search;
const params = new URLSearchParams(queryString);
const cardId = params.get("id");
const card = data.events.find(event => event._id == cardId);


createDetails(card, detailsContainer);