const form = document.querySelector('[data-form="login"]')
const inputName = form.querySelector('[data-input="name"]')
const playButton = form.querySelector('[data-button="play"]')

const validateNickname = ({ target }) => {
  const name = target.value

  if (name.length >= 3 && name.length <= 10) {
    playButton.disabled = false
    return
  }

  playButton.disabled = true
}

const handleSubmit = event => {
  event.preventDefault()
  const name = event.target.name.value

  localStorage.setItem('player', name)
  location = 'pages/game.html'
}

inputName.addEventListener('input', validateNickname)
form.addEventListener('submit', handleSubmit)