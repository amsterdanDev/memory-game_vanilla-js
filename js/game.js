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

const nav = document.querySelector('[data-element="nav"]')
const bestTimeNameContainer = document.querySelector('[data-bestTime="name"]')
const bestTimeTimeContainer = document.querySelector('[data-bestTime="time"]')
const playerContainer = document.querySelector('[data-element="player"]')
const timeNumberContainer = document.querySelector('[data-element="time"]')
const cardsContainer = document.querySelector('[data-element="cardsContainer"]')

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

    const endGameDice = {
      name: playerContainer.textContent,
      time: currentTime
    }

    const bestTime = JSON.parse(localStorage.getItem('bestTime'))

    if (bestTime) {
      if (bestTime.time > endGameDice.time) {
        localStorage.setItem('bestTime', JSON.stringify(endGameDice))
      }
    } else {
      localStorage.setItem('bestTime', JSON.stringify(endGameDice))
    }

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
  }, 600)

  setTimeout(() => {
    firstCard.style.pointerEvents = ''
    secondCard.style.pointerEvents = ''

    firstCard = ''
    secondCard = ''
  }, 800)
}

const revelCard = ({ target }) => {
  const character = target.dataset.character

  if (!character) return null
  if (target.classList.value.includes('revel-card')) return null

  target.style.pointerEvents = 'none'

  target.classList.add('revel-card')

  if (firstCard === '') return firstCard = target

  secondCard = target
  checkCards()
}

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

const pauseGame = button => {
  cardsContainer.style.pointerEvents = 'none'
  cardsContainer.style.filter = 'opacity(.5) grayScale(1)'
  clearInterval(idInterval)

  button.textContent = 'RETORNAR'
  button.classList.add('return')
  button.dataset.button = 'return'
}

const returnGame = button => {
  cardsContainer.style.pointerEvents = ''
  cardsContainer.style.filter = ''

  button.textContent = 'PAUSAR'
  button.classList.remove('return')
  button.dataset.button = 'pause'

  startTime()
}

const restartGame = () => location.reload()

const navHandleClick = ({ target }) => {
  const dataTarget = target.dataset.button

  if (dataTarget === 'restart') return restartGame()

  if (dataTarget === 'pause') return pauseGame(target)

  if (dataTarget === 'return') return returnGame(target)
}

cardsContainer.addEventListener('click', revelCard)
nav.addEventListener('click', navHandleClick)

window.addEventListener('load', () => {
  playerContainer.textContent = localStorage.getItem('player')
  const bestTime = JSON.parse(localStorage.getItem('bestTime'))
  if (bestTime) {
    bestTimeNameContainer.textContent = bestTime.name
    bestTimeTimeContainer.textContent = fancyTimeFormat(bestTime.time)
  }

  startTime()
  loadGame()
})