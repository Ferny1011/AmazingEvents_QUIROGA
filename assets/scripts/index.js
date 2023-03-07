import data from "./amazing.js";


let homeEvents = [];
const cards = document.querySelector(".cards");
const fragment = document.createDocumentFragment();


downloadEvents(data.events);
for (let events of homeEvents) {     //this loop will create a card for each event in the homeEvents template.
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


//this function will push all the events to the homeEvents array.
function downloadEvents(events) {
    for (let i = 0; i < events.length; i++) {
        homeEvents.push(events[i]);
    }
}