import data from "./amazing.js";
import { createCards, generateCategories, getCategories, searchFilter, categoryFilter } from "./functions.js";


let homeEvents = data.events;
const cards = document.querySelector(".cards");
const categoriesContainer = document.querySelector(".categories");
const searchBar = document.getElementById("searchBar");


createCards(homeEvents, cards);
let homeCategories = getCategories(homeEvents);
generateCategories(homeCategories, categoriesContainer);
searchFilter(searchBar, homeEvents, cards);
categoryFilter(homeEvents, cards, categoriesContainer);