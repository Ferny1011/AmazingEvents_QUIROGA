import data from "./amazing.js";
let pastEvents = [];

//this function will compare the date of the event with the current date and push the event to the pastEvents array if the event date is less than the current date
function pastEvents(events, date) {
    for (let i = 0; i < events.length; i++) {
        if (events[i].date < date) {
            pastEvents.push(events[i]);
        }
    }
}

pastEvents(data.events, data.currentDate);

