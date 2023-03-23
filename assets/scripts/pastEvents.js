import { createCards, getCategories, generateCategories, filterByAll, downloadData } from "./functions.js";


const data = await downloadData();
let pastEvents = data.events.filter(event => event.date < data.currentDate);
const cards = document.querySelector(".cards");
const categoriesContainer = document.querySelector(".categories");
const searchBar = document.getElementById("searchBar");


createCards(pastEvents, cards);
let pastCategories = getCategories(pastEvents);
generateCategories(pastCategories, categoriesContainer);
filterByAll(searchBar, pastEvents, cards, categoriesContainer);