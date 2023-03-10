import data from "./amazing.js";
import { downloadEvents, createCards} from "./functions.js";


export let homeEvents = [];
const cards = document.querySelector(".cards");


downloadEvents(data.events, homeEvents);
createCards(homeEvents, cards);
