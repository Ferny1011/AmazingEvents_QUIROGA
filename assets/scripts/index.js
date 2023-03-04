import data from "./amazing.js";
let homeEvents = [];

//this function will push all the events to the homeEvents array.
function downloadEvents(events, date) {
    for (let i = 0; i < events.length; i++) {
        homeEvents.push(events[i]);
    }
}

downloadEvents(data.events, data.currentDate);
