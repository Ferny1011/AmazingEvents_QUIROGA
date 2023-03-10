import data from "./amazing.js";
import { createCards, getCategories, generateCategories} from "./functions.js";


let pastEvents = data.events.filter(event => event.date < data.currentDate);
const cards = document.querySelector(".cards");
const categoriesContainer = document.querySelector(".categories");


createCards(pastEvents, cards);
let pastCategories = getCategories(pastEvents);
generateCategories(pastCategories, categoriesContainer);


