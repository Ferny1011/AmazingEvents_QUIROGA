import data from "./amazing.js";


let pastEvents = [];
const cards = document.querySelector(".cards");
const fragment = document.createDocumentFragment();


downloadPastEvents(data.events, data.currentDate);
for (let events of pastEvents) {     //this loop will create a card for each event in the pastEvents template.
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src="${events.image}" class="card-img-top" alt="${events.name}">
    <div class="card-body">
        <h5>${events.name}</h5>
        <p class="card-text">${events.description}</p>
        <div class="card-footer">
            <p>Price $${events.price}</p>
            <a href="pages/details.html">More...</a>
        </div>
    </div>`;
    fragment.appendChild(card);
}
cards.appendChild(fragment);


//this function will compare the date of the event with the current date and push the event to the pastEvents array if the event date is less than the current date
function downloadPastEvents(events, date) {
    for (let i = 0; i < events.length; i++) {
        if (events[i].date < date) {
            pastEvents.push(events[i]);
        }
    }
}


