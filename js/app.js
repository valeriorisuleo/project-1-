window.addEventListener('DOMContentLoaded', ()=>{

// 1. I need to create a Deck
  function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }


  const names = [2, 3, 4, 5, 6, 7, 8, 9, 10,11];
  const suits = ['Spade','Bastoni','Denari','Coppe'];
  let cards = [];

  for (let i = 0; i < suits.length; i++) {
    console.log(suits[i]);
    for (let j = 0; j < names.length; j++) {
      cards.push({
        suit: suits[i],
        value: names[j]
      });
    }
  }

  cards = shuffle(cards);

  console.log(cards);
  // console.log(cards.pop(), cards.length);
  // console.log(cards.pop().suit); // getting card suit
  // console.log(cards.pop().value); // getting card value


//GAME:

document.querySelector('button').addEventListener('click', () => {
  drawCards();
  gameLogic();
});


let cardOne = null;
let cardTwo = null;

function drawCards() {

cardOne = cards.pop();
console.log(cardOne);
cardTwo = cards.pop();
console.log(cardTwo);
}


function gameLogic() {
  if (cardOne.value > cardTwo.value) {
    player1Deck.push(cardOne.value);
    player1Deck.push(cardTwo.value);
    console.log('player1Deck:' +player1Deck);

  } else {
    player2Deck.push(cardOne.value);
    player2Deck.push(cardTwo.value);
    console.log('player2Deck:'+player2Deck);

  }
  ace();
}


//HERE WE PUT PUSH BOTH CARDS INTO THE ARRAY OF THE WINNER OF THE FIRST ROUND

  let player1Deck = [];
  let player2Deck = [];


//WHAT WILL HAPPEN IF IS AN ACE(11)

function ace() {
  if (cardOne.value === 11) {
    player1Deck.push(player2Deck);
    player2Deck= [];
    console.log('player1Deck' +player1Deck);

  } else if (cardTwo.value === 11){

    player2Deck.push(player1Deck);
    console.log('player2Deck' +player2Deck);
    player1Deck=[];
  }
}

// IF CARD1 === CARDS

function square() {
  if (cardOne.value===cardTwo.value) {
    cards.push(cardOne);
    cards.push(cardTwo);
    cards.shuffle();

  }
}




});
