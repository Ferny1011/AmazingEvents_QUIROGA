import { createStatsTable, downloadData } from "./functions.js";


const data = await downloadData();
const statsContainer = document.getElementById("tableStats");
const allEvents = data.events;
const pastEvents = data.events.filter(event => event.date < data.currentDate);
const upcomingEvents = data.events.filter(event => event.date > data.currentDate);


createStatsTable(statsContainer, allEvents, pastEvents, upcomingEvents);