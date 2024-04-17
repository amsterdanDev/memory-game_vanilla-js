const form = document.querySelector('[data-form="login"]')
const inputName = form.querySelector('[data-input="name"]')
const playButton = form.querySelector('[data-button="play"]')
const buttonsLevelWrapper = document.querySelector('[data-element="buttons-level-wrapper"]')

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
  const level = document.querySelector('input[name="level"]:checked').value

  localStorage.setItem('game-data', JSON.stringify({ name, level }))
  location = 'pages/game.html'
}


const handleChangeLevelButtons = () => {
  const levelsLabel = document.querySelectorAll('[data-level="label"]')
  levelsLabel.forEach(level => level.classList.remove('c-login__label-level--active'))
  
  const valueInput = document.querySelector('input[name="level"]:checked').value
  const labelInput = document.querySelector(`#${valueInput}`)
  labelInput.classList.add('c-login__label-level--active')
}

inputName.addEventListener('input', validateNickname)
form.addEventListener('submit', handleSubmit)
buttonsLevelWrapper.addEventListener('change', handleChangeLevelButtons)