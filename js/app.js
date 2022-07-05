const five = document.getElementById('five')
const ten = document.getElementById('ten')
const fifteen = document.getElementById('fifteen')
const twentyFive = document.getElementById('twentyFive')
const fifty = document.getElementById('fifty')
const custom = document.getElementById('custom')
const bill = document.getElementById('bill')
const noOfPeople = document.getElementById('noOfPeople')
const tipPerPerson = document.getElementById('tipPerPerson')
const totalPerPerson = document.getElementById('totalPerPerson')
const reset = document.getElementById('reset')
const errorMessage = document.getElementById('errorMessage')

let customTip
let billValue
let noOfPeopleValue
tipPerPerson.innerHTML = `$0.00`
totalPerPerson.innerHTML = `$0.00`

// Putting all btn's into an array
let selectedTips = [five, ten, fifteen, twentyFive, fifty]

// adding active class to the button
selectedTips.forEach((tip) => {
  tip.addEventListener('click', () => {
    removeActiveClass()
    tip.classList.add('active')
  })
})

// remove active class
function removeActiveClass() {
  selectedTips.forEach((tip) => {
    tip.classList.remove('active')
  })
}

// looping through the array and adding event listeners to each button
selectedTips.forEach((tip) => {
  tip.addEventListener('click', getSelectedTip)
})

// Adding event listener to the custom tip input
custom.addEventListener('input', getInputValue)

// adding event listener to the bill input
bill.addEventListener('input', getInputValue)

// adding event listener to the noOfPeople input
noOfPeople.addEventListener('input', getInputValue)

// adding event listener to reset button
reset.addEventListener('click', resetTipCalculator)

// function selectedTips button
function getSelectedTip(e) {
  customTip = Number(e.target.value)
  calculateTip()
}

// Function to get the input value
function getInputValue() {
  if (custom.value === '') {
    customTip = Number(customTip)
  } else {
    customTip = Number(custom.value)
  }
  billValue = Number(bill.value)
  noOfPeopleValue = Number(noOfPeople.value)
  calculateTip()
}

function calculateTip() {
  let tip = billValue / noOfPeopleValue
  let tipAmountPerPerson = tip * (customTip / 100)
  let totalTip = tipAmountPerPerson + tip

  if (
    isNaN(Number(tipAmountPerPerson)) ||
    isNaN(Number(totalTip)) ||
    tipAmountPerPerson === Infinity ||
    totalTip === Infinity
  ) {
    tipPerPerson.innerHTML = `$0.00`
    totalPerPerson.innerHTML = `$0.00`
  } else {
    tipPerPerson.innerHTML = `$${tipAmountPerPerson.toFixed(2)}`
    totalPerPerson.innerHTML = `$${totalTip.toFixed(2)}`
  }
}

// check noOfPeople input value
function checkNoOfPeople() {
  noOfPeople.addEventListener('input', () => {
    noOfPeopleValue = Number(noOfPeople.value)
    if (noOfPeopleValue === 0) {
      errorMessage.innerHTML = `<p>Can't add zero</p>`
      noOfPeople.classList.add('error')
    } else {
      errorMessage.innerHTML = ''
      noOfPeople.classList.remove('error')
    }

    setTimeout(() => {
      errorMessage.innerHTML = ''
    }, 1000)
  })
}
checkNoOfPeople()

// Resting the calculator
function resetTipCalculator() {
  bill.value = ''
  noOfPeople.value = ''
  custom.value = ''
  tipPerPerson.innerHTML = `$0.00`
  totalPerPerson.innerHTML = `$0.00`
  removeActiveClass()
}
