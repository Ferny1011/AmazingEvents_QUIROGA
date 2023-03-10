import data from "./amazing.js";
import { createCards} from "./functions.js";


let upcomingEvents = data.events.filter(event => event.date > data.currentDate);
const cards = document.querySelector(".cards");


createCards(upcomingEvents, cards);