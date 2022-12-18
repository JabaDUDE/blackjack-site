const url = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6'

document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.log(`error: ${err.message}`))
}
