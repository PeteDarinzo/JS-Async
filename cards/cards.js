const cardsUrl = "http://deckofcardsapi.com";
let deckId = "";

/********************************************************
 * Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
 ********************************************************/

// async function drawCard() {
//     const res = await axios.get(`${cardsUrl}/api/deck/new/shuffle/?deck_count=1`)
//     deckId = res.data.deck_id;
//     const card = await axios.get(`${cardsUrl}/api/deck/${deckId}/draw/?count=1`)
//     const value = card.data.cards[0].value;
//     const suit = card.data.cards[0].suit;
//     console.log(`${value} of ${suit}`)
// }



/********************************************************
 *Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
Once you have both cards, console.log the values and suits of *both cards.
 ********************************************************/

// async function drawTwoCards() {
//     const res = await axios.get(`${cardsUrl}/api/deck/new/shuffle/?deck_count=1`)
//     deckId = res.data.deck_id;
//     const cardOne = await axios.get(`${cardsUrl}/api/deck/${deckId}/draw/?count=1`)
//     const cardOneValue = cardOne.data.cards[0].value;
//     const cardOneSuit = cardOne.data.cards[0].suit;
//     console.log(`${cardOneValue} of ${cardOneSuit}`)
//     const cardTwo = await axios.get(`${cardsUrl}/api/deck/${deckId}/draw/?count=1`)
//     const cardTwoValue = cardTwo.data.cards[0].value;
//     const scardTwoSuit = cardTwo.data.cards[0].suit;
//     console.log(`${cardTwoValue} of ${scardTwoSuit}`)
// }




/********************************************************
 * Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
 ********************************************************/

function getRandomAngle() {
    // Generate angle between -39 and 39 degrees for displaying a card
    const rotation = Math.floor(Math.random() * 40);
    const sign = Math.floor(Math.random() * 2)
    if (sign === 0) {
        return rotation * (-1);
    } else {
        return rotation;
    }
}


function getRandomTranslation() {
    // Generate small (+/- 24px) shift for displaying a card
    const translation = Math.floor(Math.random() * 25);
    const sign = Math.floor(Math.random() * 2)
    if (sign === 0) {
        return translation * (-1);
    } else {
        return translation;
    }
}

async function shuffleDeck() {
    const res = await axios.get(`${cardsUrl}/api/deck/new/shuffle/?deck_count=1`)
    deckId = res.data.deck_id;
}

shuffleDeck()

async function drawCard() {
    const res = await axios.get(`${cardsUrl}/api/deck/${deckId}/draw/?count=1`)
    if (res.data.remaining === 0) {
        $("#draw-button").html("NO CARDS REMAINING")
    }
    $("#counter").html(`Cards Remaining: ${res.data.remaining}`)
    const image = res.data.cards[0].image;
    const rotation = getRandomAngle();
    const x = getRandomTranslation();
    const y = getRandomTranslation();
    $("#draw-pile").append(`<div class="card position-absolute" style="transform: rotate(${rotation}deg) translate(${x}px, ${y}px);"><img src="${image}"></div>`);
}

$("#draw-button").on("click", () => {
    drawCard();
})