import { createCards, getCategories, generateCategories, filterByAll, downloadData } from "./functions.js";


const data = await downloadData();
let upcomingEvents = data.events.filter(event => event.date > data.currentDate);
const cards = document.querySelector(".cards");
const categoriesContainer = document.querySelector(".categories");
const searchBar = document.getElementById("searchBar");


createCards(upcomingEvents, cards);
let upcomingCategories = getCategories(upcomingEvents);
generateCategories(upcomingCategories, categoriesContainer);
filterByAll(searchBar, upcomingEvents, cards, categoriesContainer);