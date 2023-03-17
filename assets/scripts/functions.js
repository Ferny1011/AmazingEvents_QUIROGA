//this function will download the data from the API
export async function downloadData(){
    let data;
    await fetch ("/assets/data/amazing.json")
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

