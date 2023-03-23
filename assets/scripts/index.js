import { createCards, generateCategories, getCategories, filterByAll, downloadData } from "./functions.js";


const data = await downloadData();
let homeEvents = data.events;
const cards = document.querySelector(".cards");
const categoriesContainer = document.querySelector(".categories");
const searchBar = document.getElementById("searchBar");


createCards(homeEvents, cards);
let homeCategories = getCategories(homeEvents);
generateCategories(homeCategories, categoriesContainer);
filterByAll(searchBar, homeEvents, cards, categoriesContainer);