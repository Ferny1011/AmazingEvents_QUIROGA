//this function will push all the events to an array.
export const downloadEvents = (events, array) => {
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


//this function will filter the events by category.

// export function categoryFilter(array, container){
//     let categories = container.querySelectorAll(".form-check-input");
//     let categoriesArray = Array.from(categories);
//     let categoriesChecked = categoriesArray.filter(category => category.checked);
//     let categoriesValues = categoriesChecked.map(category => category.value);//to lowwer
//     if(categoriesChecked.length > 0){
//         let arrayFiltrado = array.filter(item => categoriesValues.includes(item.value));//tolower
//         return arrayFiltrado;
//     }
//     return array;
// }

// // categories.addEventListener("change", (e) => {
//     let arrayFiltrado = categoryFilter(array, categories);
//     createCards(arrayFiltrado, container);



// //this function will filter the events by name.

// export function searchFilter(input, array, container){
//     input.addEventListener("keyup", (e) => {
//         let arrayFiltrado = filterByName(array, e.target.value);
//         createCards(arrayFiltrado, container);
//     });
// }

// function filterByName(array, textoUsuario){
//     let arrayAux = array.filter(item => item.name.toLowerCase().includes(textoUsuario.toLowerCase().trim()));
//     if(arrayAux.length > 0){
//         return arrayAux
//     }
//     return array;
// }

