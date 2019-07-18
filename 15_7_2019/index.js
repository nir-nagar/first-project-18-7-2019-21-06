
const VACATION_DOM = {

    name_vacation: document.getElementById("name_vacation"),
    url_pic_vacation: document.getElementById("url_pic_vacation"),
    price_vacation: document.getElementById("price_vacation"),
    rating_vacation: document.getElementById("rating_vacation"),
    my_vacation_Cards: document.getElementById("my_vacation_Cards")

}

let array_of_vacation = [];

function saveCard() {

    const {
        name_vacation,
        url_pic_vacation,
        price_vacation,
        rating_vacation,
        my_vacation_Cards
    } = VACATION_DOM

    if (allInputEmpty()) {
        alert("Please Fill All Input");
        return;
    }

    array_of_vacation.push(new Card(name_vacation.value,
        url_pic_vacation.value,
        price_vacation.value,
        rating_vacation.value))

    saveArrayToLocalStorage();

    draw(array_of_vacation);

}
function draw(array) {
    clearAllTable();

    for (let i = 0; i < array.length; i++) {
        drawCard(array[i]);

    }
}
function clearAllTable() {
    VACATION_DOM.my_vacation_Cards.innerHTML = "";
}


function drawCard(card) {
    const { my_vacation_Cards } = VACATION_DOM
    const newCard = createNewCard(card)

    if (!newCard) return

    my_vacation_Cards.append(newCard)

}


function createNewCard(card) {
    const {
        name_vacation,
        url_pic_vacation,
        price_vacation,
        rating_vacation
    } = card


    if (!name_vacation ||
        !url_pic_vacation ||
        !price_vacation ||
        !rating_vacation) return;


    /// create the element card 
    const temp_card = document.createElement("div");
    temp_card.className = "card container mt-5 mb-5";
    temp_card.style = "width: 18rem; back;background-color: #d4d3d3;"
    temp_card.id = Math.floor(Math.random() * 100000);

    const temp_card_title = document.createElement("h2");
    temp_card_title.className = "card-title test-canter";
    temp_card_title.innerText = name_vacation;

    const temp_card_picture = document.createElement("img");
    temp_card_picture.className = "myPic"
    temp_card_picture.src = url_pic_vacation;

    const temp_card_body = document.createElement("div");
    temp_card_body.className = "card-body";

    const temp_card_text_1 = document.createElement("h6");
    temp_card_text_1.className = "test-canter";
    temp_card_text_1.innerText = "Price : " + price_vacation;

    ///----------------------------------------------
    let temp_rating_vacation = switch_rating_vacation_to_rating(rating_vacation)
    ///--------------------------------------------------------

    const temp_card_text_2 = document.createElement("h6");
    temp_card_text_2.className = "test-canter";
    temp_card_text_2.innerHTML = "Rating : " + temp_rating_vacation;

    const temp_card_text_button_del = document.createElement("button");
    temp_card_text_button_del.className = "btn1 btn-danger del_button";
    temp_card_text_button_del.innerHTML = 'X';
    // temp_card_text_button_del.addEventListener("click", deleteCard(temp_card.id))
    temp_card_text_button_del.addEventListener("click", deleteCard)

    temp_card.appendChild(temp_card_text_button_del);

    temp_card.appendChild(temp_card_title);
    temp_card.appendChild(temp_card_picture);
    temp_card.appendChild(temp_card_body);
    temp_card.appendChild(temp_card_text_1);
    temp_card.appendChild(temp_card_text_2);

    return temp_card;


}

function deleteCard() {
    // let idNane = this.
    const index = findCardIndex(array_of_vacation, idName)
    if (idName === undefined) return;
    array_of_vacation.splice(index, 1)
    saveArrayToLocalStorage();
    draw(array_of_vacation)

}
// function deleteCard(idName) {

//     const index = findCardIndex(array_of_vacation, idName)
//     if (idName === undefined) return;
//     array_of_vacation.splice(index, 1)
//     saveArrayToLocalStorage();
//     draw(array_of_vacation)

// }

function findCardIndex(data, id) {
    for (let index = 0; index < data.length; index++) {
        if (data[index].name_vacation === id) {
            return index
        }
    }
}
function switch_rating_vacation_to_rating(str) {
    switch (str) {
        case 'Excellent':
            return '****';

        case 'Good':
            return '***';

        case 'Regular':
            return '**';

        // break;
        case 'Bad':
            return '*';

        default:
            return ('Sorry, No Rating ');
    }
}


function saveArrayToLocalStorage() {
    localStorage.setItem("localStorageArray_Of_Cards_Data", JSON.stringify(array_of_vacation));

}

function allInputEmpty() {
    const {
        name_vacation,
        url_pic_vacation,
        price_vacation,
        rating_vacation
    } = VACATION_DOM

    if ((name_vacation.value === "") ||
        (url_pic_vacation.value === "") ||
        (price_vacation.value === "") ||
        (rating_vacation.value === "")) {

        return true;
    }
    return false;
}






function Card(
    _name_vacation,
    _url_pic_vacation,
    _price_vacation,
    _rating_vacation) {


    this.name_vacation = _name_vacation;
    this.url_pic_vacation = _url_pic_vacation;
    this.price_vacation = _price_vacation;
    this.rating_vacation = _rating_vacation;

}




function init() {
    let checkLocalStorage = localStorage.getItem(("localStorageArray_Of_Cards_Data"));
    if (checkLocalStorage != null) {
        array_of_vacation = JSON.parse(checkLocalStorage)

    }
    draw(array_of_vacation)


}
init();



