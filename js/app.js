$(()=>{
  let player1Deck = [];
  let player2Deck = [];
  let cardOne = null;
  let cardTwo = null;
  const names = [2, 3, 4, 5, 6, 7, 8, 9, 10,11];
  const suits = ['Spade','Bastoni','Denari','Coppe'];
  let cards = [];
  const $button = $('#gameOn');
  const $leftDeck = $('#leftDeck');
  const $rightDeck = $('#rightDeck');
  const $player1Hand = $('.player1Hand');
  const $player2Hand = $('.player2Hand');
  $player1Hand.text('Cpu');
  $player2Hand.text('Player');
  const playerSelect = document.getElementsByClassName('playerSelect');
  const span = document.getElementById('current');



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


  function refillDeck() {
    suits.forEach((suit) => {
      names.forEach((name) => {
        cards.push({
          suit: suit,
          value: name
        });
      });
    });
    cards = shuffle(cards);
    console.log(cards);
  }

  refillDeck(); // Create deck when page first loads

  // console.log(cards.pop(), cards.length);
  // console.log(cards.pop().suit); // getting card suit
  // console.log(cards.pop().value); // getting card value


  for (let i = 0; i < playerSelect.length; i++) {
    playerSelect[i].addEventListener('mouseover', (e) => {
      span.innerHTML = e.target.innerHTML;
    });
    playerSelect[i].addEventListener('mouseout', () => {
      span.innerHTML = ' ';
    });
  }

  //GAME:
  $button.on('click', () => {
    drawCards();
    gameLogic();
    checkForGameOver();
    playThis(`sounds/winchester.wav`);
  });


  function playThis(audio) {
    audio = new Audio(audio);
    audio.play();
  }




  function drawCards() {

    cardOne = cards.pop();
    console.log(cardOne);

    cardTwo = cards.pop();
    console.log(cardTwo);
  }


  function gameLogic() {

    cardDeckChecker();

    // if cardOne or cardTwo is undefined, (ie. falsey)
    // reshuffle the cards, or restart the game, or say game over or something...
    if (cardOne.value === 11) {
      player1Deck.concat(player2Deck);
      player2Deck= [];
      console.log('player1Deck' +player1Deck);

    } else if (cardTwo.value === 11){

      player2Deck.concat(player1Deck);
      console.log('player2Deck' +player2Deck);
      player1Deck=[];
    }

    if (cardOne.value === cardTwo.value) {
      cards.push(cardOne);
      cards.push(cardTwo);
      shuffle(cards);
      setTimeout( () => {
        alert('I am Gonna Make You an Offer You Cannot Rufuse');
      }, 500);

    } else if (cardOne.value > cardTwo.value) {
      player1Deck.push(cardOne);
      player1Deck.push(cardTwo);
      console.log(player1Deck);
      // $player1Hand.text(player1Deck[0]);
      var p1h = player1Deck.reduce((accumulator, currentValue)=>{
        return accumulator + currentValue.value;
      },0);
      $player1Hand.text(p1h);

    } else {
      player2Deck.push(cardOne);
      player2Deck.push(cardTwo);
      console.log(player2Deck);
      // $player2Hand.text(player2Deck[0]);
      var p2h = player2Deck.reduce((accumulator, currentValue)=>{
        return accumulator + currentValue.value;
      },0);
      $player2Hand.text(p2h);


    }
    if (cards.length === 0 && cardOne.value === null) {
      alert('deck is over');
    }
  }

  function checkForGameOver() {

  if (cards.length === 0) {
    const player1Total = player1Deck.reduce((accumulator, currentValue)=>{
      return accumulator + currentValue.value;
    },0);
    console.log('player one score', player1Total);
    const player2Total = player2Deck.reduce((accumulator, currentValue)=>{
      return accumulator + currentValue.value;
    },0);
    console.log('player two score', player2Total);

    if (player1Total > player2Total) {
      alert('You win!');
    } else if (player2Total > player1Total) {
      alert('Thanks Master');
    } else{
      alert('I wanna die!');
    }
    refillDeck();
  }
  }


  function cardDeckChecker() {
    $leftDeck.css('background-image', `url("pics/cards/${cardOne.suit}/${cardOne.value}.png")`);
    $rightDeck.css('background-image', `url("pics/cards/${cardTwo.suit}/${cardTwo.value}.png")`);
  }

});
