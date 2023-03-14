import data from "./amazing.js";
import { createCards, getCategories, generateCategories } from "./functions.js";


let upcomingEvents = data.events.filter(event => event.date > data.currentDate);
const cards = document.querySelector(".cards");
const categoriesContainer = document.querySelector(".categories");


createCards(upcomingEvents, cards);
let upcomingCategories = getCategories(upcomingEvents);
generateCategories(upcomingCategories, categoriesContainer);
