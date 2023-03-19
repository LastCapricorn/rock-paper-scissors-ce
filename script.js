window.onload = () => document.querySelector('#start').addEventListener('click', playGame);

function playGame() {
  document.querySelector('#start').toggleAttribute('disabled');
  const computerSelection = getComputerChoice();
  const playerSelection = getPlayerChoice();
  console.log(computerSelection);
  console.log(playerSelection);
}

function getComputerChoice() {
  const computeRandom = Math.floor(Math.random() * 3); // random value 0, 1 or 2
  let selection = 'Rock'; // if computeRandom == 0
  switch (computeRandom) {
    case 1:
      selection = 'Paper';
      break;
    case 2:
      selection = 'Scissors';
      break;
  }
  return selection;
}

function getPlayerChoice() {
  let selection = "";
  let validInput = false;
  while (!validInput) { // prompting till valid Input!
    selection = prompt('Please enter your choice (rock, paper or scissors):');
    if (checkInput(selection)) {
      validInput = !validInput;
    } else {
      console.warn('Only "rock","paper" or "scissors" as input accepted!');
    }
  };
  return selection;
}

function checkInput(string) {
  if (string.toLowerCase() == 'rock' ||
      string.toLowerCase() == 'paper' ||
      string.toLowerCase() == 'scissors') {
    return true;
  };
  return false;
}
