import data from "./amazing.js";
let upcomingEvents = [];

//this function will compare the date of the event with the current date and push the event to the upcomingtEvents array if the event date is greater than the current date
function upcomingEvents(events, date) {
    for (let i = 0; i < events.length; i++) {
        if (events[i].date > date) {
            upcomingEvents.push(events[i]);
        }
    }
}

upcomingEvents(data.events, data.currentDate);