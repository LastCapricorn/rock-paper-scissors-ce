window.onload = () => document.querySelector('#start').addEventListener('click', game);

function game() {

  let playerScore = 0;
  let computerScore = 0;
  let endResult;

  for (let rounds = 1, playerChoice = null; rounds < 6; rounds++) {
    console.log(`ROUND ${rounds}:`);
    playerChoice = getPlayerChoice();
    if (playerChoice != null) {
      console.log(playRound(playerChoice.toLowerCase(), getComputerChoice()));
    } else {
      console.log('Player quits the game...');
      break;
    }
  }

  if (playerScore === computerScore) {
    endResult = "This Game ends in a Tie - "; 
  } else {
    if (playerScore > computerScore) {
      endResult = 'You Win this Game - ';
    } else {
      endResult = 'You Lose this Game - ';
    }
  }
  console.log(endResult + `${playerScore} : ${computerScore} !`);
  console.log('Click "Play! - Button" to play again');

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
      if (checkInput(selection) || checkInput(selection) === null) {
        validInput = !validInput; // toggle variable to 'true'
      } else {
        console.warn("Only 'rock','paper' or 'scissors' as input accepted! (case doesn't matter)");
      }
    };
    return selection;
  }

  function checkInput(string) {
    if (string == 'rock' ||
        string == 'paper' ||
        string == 'scissors') {
      return true;
    } else if (string === null) {
      return string;
    }
    return false;
  }

  function playRound(playerSelection, computerSelection) {
    let resultString = "";
    let isWin = false;
    const answer1 = "Rock beats Scissors.";
    const answer2 = "Paper covers Rock.";
    const answer3 = "Scissors cut paper.";
    const tieString = computerSelection[0].toUpperCase() + computerSelection.slice(1);

    if (playerSelection === computerSelection) {
      resultString = `It's a tie! ${tieString} vs. ${tieString}`;
      return resultString;
    }
    if (playerSelection === 'rock') {
      if (computerSelection === 'scissors') {
        isWin = true;
        resultString = answer1;
      } else {
        resultString = answer2;
      }
    }
    if (playerSelection === 'paper') {
      if (computerSelection === 'rock') {
        isWin = true;
        resultString = answer2;
      } else {
        resultString = answer3;
      }
    }
    if (playerSelection === 'scissors') {
      if (computerSelection === 'paper') {
        isWin = true;
        resultString = answer3;
      } else {
        resultString = answer1;
      }
    }
    isWin === true ? playerScore++ : computerScore++;
    return resultString = isWin ? `You Win! ${resultString}` : `You Lose! ${resultString}`;
  }
}
