import data from "./amazing.js";
import { createCards, generateCategories, getCategories, filterByAll } from "./functions.js";


let homeEvents = data.events;
const cards = document.querySelector(".cards");
const categoriesContainer = document.querySelector(".categories");
const searchBar = document.getElementById("searchBar");


createCards(homeEvents, cards);
let homeCategories = getCategories(homeEvents);
generateCategories(homeCategories, categoriesContainer);
filterByAll(searchBar, homeEvents, cards, categoriesContainer);