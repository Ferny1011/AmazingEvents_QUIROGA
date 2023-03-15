import data from "./amazing.js";
import { createCards, getCategories, generateCategories, filterByAll } from "./functions.js";


let upcomingEvents = data.events.filter(event => event.date > data.currentDate);
const cards = document.querySelector(".cards");
const categoriesContainer = document.querySelector(".categories");
const searchBar = document.getElementById("searchBar");


createCards(upcomingEvents, cards);
let upcomingCategories = getCategories(upcomingEvents);
generateCategories(upcomingCategories, categoriesContainer);
filterByAll(searchBar, upcomingEvents, cards, categoriesContainer);
