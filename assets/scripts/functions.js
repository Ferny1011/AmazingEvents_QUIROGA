//this function will download the data from the API
export async function downloadData() {
    let data;
    await fetch("/assets/data/amazing.json")
        .then(response => response.json())
        .then(json => data = json)
    return data;
}

//this function will create a card for each event in the template.
export const createCards = (events, container) => {
    if (events.length == 0)
        return container.innerHTML = "<h1>No events found</h1>"
    container.innerHTML = "";
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
                <a href="/pages/details.html?id=${event._id}">More...</a>
            </div>
        </div>`;
        fragment.appendChild(card);
    });
    container.appendChild(fragment);
}

//this function will get the categories from the events.
export const getCategories = (events) => {
    let categories = (events.map(event => event.category)).filter((category, index, array) => array.indexOf(category) === index);
    return categories;
}

//this function will create a list of categories in the template.
export const generateCategories = (categories, container) => {
    let fragment = document.createDocumentFragment();
    categories.forEach((category, index) => {
        let option = document.createElement("div");
        option.classList.add("form-check", "form-check-inline");
        option.innerHTML = `
        <input class="form-check-input" type="checkbox" id="${index}" value="${category}">
        <label class="form-check-label" for="${index}">${category}</label>`;
        fragment.appendChild(option);
    });
    container.appendChild(fragment);
}

//this function will filter the events by name.
function filterByname(name, array) {
    let filteredArray = array.filter(item => item.name.toLowerCase().includes(name.value.toLowerCase()));
    return filteredArray;
}

//this function will filter the events by category.
function filterByCategory(categoriesContainer, array) {
    let categories = categoriesContainer.querySelectorAll(".form-check-input");
    let categoriesArray = Array.from(categories);
    let categoriesChecked = categoriesArray.filter(category => category.checked);
    let categoriesValues = categoriesChecked.map(category => category.value);
    let filteredArray = array.filter(item => categoriesValues.includes(item.category));
    if (categoriesChecked.length > 0)
        return filteredArray;
    else
        return array;
}

//this function will filter the events by name and category.
function combinedFilter(searchBar, array, container, categoriesContainer) {
    let filteredArrayByName = filterByname(searchBar, array);
    let filteredArrayByCategory = filterByCategory(categoriesContainer, filteredArrayByName);
    createCards(filteredArrayByCategory, container);
}

export function filterByAll(searchBar, array, container, categoriesContainer) {
    categoriesContainer.addEventListener("change", () => {
        combinedFilter(searchBar, array, container, categoriesContainer);
    });

    searchBar.addEventListener("input", () => {
        combinedFilter(searchBar, array, container, categoriesContainer);
    });
}

//this function will create details template.
export const createDetails = (item, container) => {
    let details = document.createElement("div");
    details.classList.add("details-card");
    details.innerHTML = `
        <div class="img-details">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="description-details">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><span>Category:</span> ${item.category}</p>
            <p><span>Place:</span> ${item.place}</p>
            <p><span>Capacity:</span> ${item.capacity}</p>
            <p><span>${item.assistance ? "Assistance" : "Estimate"}:</span> ${item.assistance ? item.assistance : item.estimate}</p>
            <p><span>Price:</span> $${item.price}</p>
        </div>`;
    container.appendChild(details);
}

//this function will return the event with the highest of one property.
function getHighest(events, property) {
    let highest = events.reduce((prev, current) => (prev[property] > current[property]) ? prev : current);
    return highest;
}

//this function will get percentage of attendance by category.
function getPercentageByCategory(events) {
    let attendance = 0;
    let capacity = 0;
    events.forEach(event => {
        attendance += event.assistance ? event.assistance : event.estimate;
        capacity += event.capacity;
    });
    return ((attendance / capacity) * 100).toFixed(2);
}

//this function will get percentage of attendance of all events.
function getPercentageAttendance(events) {
    let eventsPercentage = events.map(event => event.assistance ? (event.assistance / event.capacity) * 100 : (event.estimate / event.capacity) * 100);
    return eventsPercentage;
}

//this function will return the event with the highest percentage of attendance.
function getHighestAttendance(events) {
    let highestPercentage = Math.max(...getPercentageAttendance(events));
    let highestAttendance = events.find(event => event.assistance ? (event.assistance / event.capacity) * 100 == highestPercentage : (event.estimate / event.capacity) * 100 == highestPercentage);
    return highestAttendance;
}

//this function will return the event with the lowest percentage of attendance.
function getLowestAttendance(events) {
    let lowestPercentage = Math.min(...getPercentageAttendance(events));
    let lowestAttendance = events.find(event => event.assistance ? (event.assistance / event.capacity) * 100 == lowestPercentage : (event.estimate / event.capacity) * 100 == lowestPercentage);
    return lowestAttendance;
}

//this function will return the revenues.
function getRevenues(events) {
    let revenues = events.reduce((acumm, current) => acumm + current.price * (current.assistance ? current.assistance : current.estimate), 0);
    return revenues;
}

//this function will create stats in the table.
function getStatsEvents(events, container) {
    getCategories(events).forEach(category => {
        let eventsByCategory = events.filter(event => event.category == category);
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${category}</td>
        <td>${getRevenues(eventsByCategory).toLocaleString('es', { style: 'currency', currency: 'USD' })}</td>
        <td>${getPercentageByCategory(eventsByCategory)}%</td>`;
        container.appendChild(row);
    });

}

//this function will create the table in template.
export function createStatsTable(container, allEvents, pastEvents, upcomingEvents) {
    let table = document.createElement("tbody");
    table.innerHTML = `
    <tr>
        <th colspan="3">Events statistics</th>
    </tr>
    <tr class="subTitle">
        <td>
            <p>Events with the highest percentage of attendance</p>
        </td>
        <td>
            <p>Events with the lowest percentage of attendance</p>
        </td>
        <td>
            <p>Event with larger capacity</p>
        </td>
    </tr>
    <tr>
        <td>${getHighestAttendance(allEvents).name}</td>
        <td>${getLowestAttendance(allEvents).name}</td>
        <td>${getHighest(allEvents, "capacity").name}</td>
    </tr>
    <tr>
        <th colspan="3">Upcoming events statistics by category</th>
    </tr>
    <tr class="subTitle">
        <td><p>Categories</p></td>
        <td><p>Revenues</p></td>
        <td><p>Percentage of attendance</p></td>
    </tr>`;
    getStatsEvents(upcomingEvents, table);
    table.innerHTML += `
    <tr>
        <th colspan="3">Past Events statistics by category</th>
    </tr>
    <tr class="subTitle">
        <td><p>Categories</p></td>
        <td><p>Revenues</p></td>
        <td><p>Percentage of attendance</p></td>
    </tr>`;
    getStatsEvents(pastEvents, table);
    container.appendChild(table);
}