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

const cardsContainer = document.querySelector('[data-js="cardsContainer"]')

let firstCard = ''
let secondCard = ''

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

cardsContainer.addEventListener('click', revelCard)

loadGame()