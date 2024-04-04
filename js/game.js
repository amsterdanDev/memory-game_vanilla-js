const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
  'scroopy',
  'scroopy'
]

const cardsContainer = document.querySelector('[data-element="cardsContainer"]')
const playerContainer = document.querySelector('[data-element="player"]')
const timeNumberContainer = document.querySelector('[data-element="time"]')

let firstCard = ''
let secondCard = ''
let idInterval = 0
let currentTime = 0

const createElement = (tag, className) => {
  const element = document.createElement(tag)
  element.classList = className

  return element
}

const createCard = character => {

  const card = createElement('div', 'c-card-game')
  const cardContent = createElement('div', 'c-card-game__content')
  const cardFaceFront = createElement('div', 'c-card-game__face c-card-game__face--front')
  const cardFaceBack = createElement('div', 'c-card-game__face c-card-game__face--back')

  cardFaceFront.style.backgroundImage = `url(/images/${character}.png)`
  cardContent.dataset.character = character

  cardContent.append(cardFaceFront, cardFaceBack)
  card.appendChild(cardContent)

  return card
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters]
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)

  shuffledArray.forEach(character => {
    cardsContainer.appendChild(createCard(character))
  })
}

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card')

  if (disabledCards.length === characters.length * 2) {
    clearInterval(idInterval)
    alert('Fim de jogo!')
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.dataset.character
  const secondCharacter = secondCard.dataset.character

  if (firstCharacter === secondCharacter) {

    setTimeout(() => {
      firstCard.classList.add('disabled-card')
      secondCard.classList.add('disabled-card')

      firstCard = ''
      secondCard = ''

      checkEndGame()
    }, 600)

    return null
  }

  setTimeout(() => {
    firstCard.classList.remove('revel-card')
    secondCard.classList.remove('revel-card')

    firstCard = ''
    secondCard = ''
  }, 600)
}

const revelCard = ({ target }) => {
  const character = target.dataset.character

  if (!character) return null
  if (target.classList.value.includes('revel-card')) return null

  target.classList.add('revel-card')

  if (firstCard === '') return firstCard = target


  secondCard = target
  checkCards()
}

const formatTime = time => time < 10 ? `0${time}` : time

function fancyTimeFormat(duration) {
  // Hours, minutes and seconds
  const hrs = Math.floor((duration / 3600));
  const mins = Math.floor(((duration % 3600) / 60));
  const secs = Math.floor(duration % 60);

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += mins + ":" + (secs < 10 ? "0" : "");
  ret += secs;

  return ret;
}

const startTime = () => {
  idInterval = setInterval(() => {
    timeNumberContainer.textContent = fancyTimeFormat(++currentTime)
  }, 1000)
}

cardsContainer.addEventListener('click', revelCard)

window.addEventListener('load', () => {
  playerContainer.textContent = localStorage.getItem('player')

  startTime()
  loadGame()
})