import data from "./amazing.js";
import { downloadEvents, createCards, generateCategories, getCategories } from "./functions.js";


let homeEvents = [];
const cards = document.querySelector(".cards");
const categoriesContainer = document.querySelector(".categories");
const searchBar = document.getElementById("searchBar");


downloadEvents(data.events, homeEvents);
createCards(homeEvents, cards);
let homeCategories = getCategories(homeEvents);
generateCategories(homeCategories, categoriesContainer);
