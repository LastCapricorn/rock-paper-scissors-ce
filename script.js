window.onload = () => document.querySelector('#start').addEventListener('click', playGame);

function getComputerChoice() {
  const computerChoice = Math.floor(Math.random() * 3); // random value 0, 1 or 2
  let result = 'Rock'; // if computerChoice = 0
  switch (computerChoice) {
    case 1:
      result = 'Paper';
      break;
    case 2:
      result = 'Scissors';
      break;
  }
  return result;
}

function playGame() {
  document.querySelector('#start').toggleAttribute('disabled');
  console.log(getComputerChoice());
}
