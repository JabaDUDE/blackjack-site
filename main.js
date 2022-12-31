const shuffle =
  'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6'
const newDeck = 'https://www.deckofcardsapi.com/api/deck/new/draw/?count=4'
//A spot to store the deck_id
let deckID = ''
//SPACE TO KEEP TRACK OF SCORE OF BOTH PLAYER AND COMPUTER

//SPACE TO PLACE CARDS AT FOR BOTH PLAYERS
const playerCards = document.querySelector('.playerCards')
//TODO: Find a way to give one visible card to computerCards and the other 'face down'
const computerCards = document.querySelector('.computerCards')

//TODO: Get the value of whatever cards the player has and check to see if they sum to 21 or more. If they have 21, 'blackjack', if more than 21, they lose, if less than 21, they have the option to 'hit'(get a card) or 'stand'(keep whatever cards they already have).

let computerScore = document.querySelector('.compScore')
let playerScore = document.querySelector('.playerScore')
const winner = document.querySelector('.winner')

let currentPlayerScore = 0
let currentCompScore = 0
//TODO: bust and blackjack do not appear on the webpage. Placed it here so I can deal with it tomorrow

//TODO: point system for the player to bet with?

/*TODO: RULES OF BLACKJACK
https://bicyclecards.com/how-to-play/blackjack/
 Value of Cards: It is up to each individual player if an ace is worth 1 or 11. Face cards are 10 and any other card is its pip value.
 Betting: Before the deal begins, each player places a bet, in chips, in front of them in the designated area. Minimum and maximum limits are established on the betting, and the general limits are from $2 to $500.
 THE DEAL:
 When all the players have placed their bets, the dealer gives one card face up to each player in rotation clockwise, and then one card face up to themselves. Another round of cards is then dealt face up to each player, but the dealer takes the second card face down. Thus, each player except the dealer receives two cards face up, and the dealer receives one card face up and one card face down. (In some games, played with only one deck, the players' cards are dealt face down and they get to hold them. Today, however, virtually all Blackjack games feature the players' cards dealt face up on the condition that no player may touch any cards.)
 THEY PLAY:
 ...must decide whether to "stand" (not ask for another card) or "hit" (ask for another card in an attempt to get closer to a count of 21, or even hit 21 exactly).
 */

//BUTTON FOR NEW DECK
document.querySelector('.newDeck').addEventListener('click', () => {
  fetch(newDeck)
    .then((res) => res.json())
    .then((data) => {
      //reset the score
      currentPlayerScore = 0
      currentCompScore = 0
      //Capture deck id so we can draw from same deck.
      deckID = data.deck_id
      console.log(data)

      //Make sure if there are two cards displayed, they are removed so two new cards can replace them.
      document.querySelectorAll('img').forEach((img) => img.remove())

      //Attaching images to the webpage
      data.cards.forEach((card, i) => {
        //Looks at face card and assigns them default value of '10' so it can calculate sum of hand
        //TODO: Figure out a way to check if the value is an 'Ace' and assign it either value of '1' or '11' depending on whether it goes over 21 or not.
        if (
          card.value.startsWith('K') ||
          card.value.startsWith('Q') ||
          card.value.startsWith('J')
        ) {
          card.value = '10'
        } else if (card.value.startsWith('A')) {
          currentPlayerScore > 11 ? (card.value = '1') : (card.value = '11')
        }
        let img = document.createElement('img')
        img.src = card.image
        //Split the 4 cards drawn so computer gets 2 cards and player gets 2 cards. the player's cards will always pull from 0 and 1 index of data.cards array. last two will go to computer.
        //this conditional checks index of array and appends the img to either the computer or player's hand.
        if (i === 0 || i === 1) {
          playerCards.appendChild(img)
          currentPlayerScore += parseInt(card.value)
        } else {
          computerCards.appendChild(img)
          currentCompScore += parseInt(card.value)
        }
      })
      //TODO: face cards are generating a NaN because their value isn't numerical
      playerScore.innerHTML = `Player Score: ${currentPlayerScore}`
      computerScore.innerHTML = `Computer Score: ${currentCompScore}`
      currentPlayerScore === 21
        ? (winner.innerHTML = `BLACKJACK!`)
        : currentPlayerScore > 21
        ? (winner.innerHTML = `You lose!`)
        : (winner.innerHTML = `Hit or Check?`)
    })
    .catch((err) => console.log(`error: ${err.message}`))
})

document.querySelector('.addCard').addEventListener('click', () => {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)

      data.cards.forEach((card) => {
        //set value for card that is being drawn.
        if (
          card.value.startsWith('K') ||
          card.value.startsWith('Q') ||
          card.value.startsWith('J')
        ) {
          card.value = '10'
        } else if (card.value.startsWith('A')) {
          currentPlayerScore > 11 ? (card.value = '1') : (card.value = '11')
        } else {
          card.value = card.value
        }
        currentPlayerScore += parseInt(card.value)
        playerScore.innerHTML = `Player Score: ${currentPlayerScore}`
        let img = document.createElement('img')
        img.src = card.image
        playerCards.appendChild(img)
      })
      console.log(currentPlayerScore)
      currentPlayerScore === 21
        ? (winner.innerHTML = `BLACKJACK!`)
        : currentPlayerScore > 21
        ? (winner.innerHTML = `You lose!`)
        : (winner.innerHTML = `Hit or Check?`)
    })
    .catch((err) => console.log(`error: ${err.message}`))
})
console.log(currentPlayerScore)
