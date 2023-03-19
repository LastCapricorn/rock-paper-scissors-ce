window.onload = () => document.querySelector('#start').addEventListener('click', playGame);

function playGame() {
  document.querySelector('#start').toggleAttribute('disabled');
  const computerSelection = getComputerChoice();
  const playerSelection = getPlayerChoice().toLowerCase();
  const roundResult = playRound(playerSelection, computerSelection);
  console.log(roundResult);
}

function getComputerChoice() {
  const computeRandom = Math.floor(Math.random() * 3); // random value 0, 1 or 2
  let selection = 'rock'; // if computeRandom == 0
  switch (computeRandom) {
    case 1:
      selection = 'paper';
      break;
    case 2:
      selection = 'scissors';
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
  if (string == 'rock' ||
      string == 'paper' ||
      string == 'scissors') {
    return true;
  };
  return false;
}

function playRound(player, computer) {
  let resultString = "";
  let isWin = false;
  const answer1 = "Rock beats Scissors.";
  const answer2 = "Paper covers Rock.";
  const answer3 = "Scissors cut paper.";
  const tieString = computer[0].toUpperCase() + computer.slice(1);

  if (player === computer) {
    resultString = `It's a tie! ${tieString} vs. ${tieString}`;
    return resultString;
  }
  if (player === 'rock') {
    if (computer === 'scissors') {
      isWin = true;
      resultString = answer1;
    } else {
      resultString = answer2;
    }
  }
  if (player === 'paper') {
    if (computer === 'rock') {
      isWin = true;
      resultString = answer2;
    } else {
      resultString = answer3;
    }
  }
  if (player === 'scissors') {
    if (computer === 'paper') {
      isWin = true;
      resultString = answer3;
    } else {
      resultString = answer1;
    }
  }
  return resultString = isWin ? `You Win! ${resultString}` : `You Lose! ${resultString}`;
}