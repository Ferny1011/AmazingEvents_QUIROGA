//this function will push all the events to an array.
export const downloadEvents = (events,array) => {
    events.forEach(event => {
        array.push(event);
    });
}

//this function will create a card for each event in the template.
export const createCards = (events, container) => {
    let fragment = document.createDocumentFragment();
    events.forEach(event => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <img src="${event.image}" class="card-img-top" alt="${event.name}">
        <div class="card-body">
            <h5>${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <div class="card-footer">
                <p>Price $${event.price}</p>
                <a href="/pages/details.html">More...</a>
            </div>
        </div>`;
        fragment.appendChild(card);
    });
    container.appendChild(fragment);
}