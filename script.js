'use strict';

(function game() {

  const indexTab = document.getElementById('index-tab');
  const credits = document.getElementById('credits');
  const links = credits.querySelectorAll('a');
  const buttons = document.querySelectorAll('button');
  const message = document.getElementById('message');
  const msgPara = document.querySelectorAll('#message p');
  const playerScore = document.querySelector('#player-score p');
  const computerScore = document.querySelector('#machine-score p');

  const computerChoice = ['Rock', 'Paper', 'Scissors'];
  const roundLog = ['Rock beats Scissors.', 'Paper covers Rock.', 'Scissors cut paper.'];

  let plrScore = 0;
  let cptScore = 0;
  let msgAudio = '';
  let endResult;
  
  buttons.forEach( button => button.addEventListener('click', playRound));
  
  indexTab.addEventListener('click', () => {
    links.forEach( a => a.classList.toggle('display-links'));
    credits.classList.toggle('display-links');
    indexTab.classList.toggle('display-links');
    playAudio('pen-click');
  });
  
  links.forEach( (a) => a.addEventListener('click', () => {
    credits.classList.remove('display-links');
  }));
  
  function playRound(e) {
    playAudio('pen-click');
    buttons.forEach( btn => {
      btn.removeEventListener('click', playRound)
      btn.classList.add('stop');
    });
    let result = roundResult(e.target.value, computerChoice[Math.floor(Math.random() * 3)]);
    msgPara[0].textContent = result[0];
    msgPara[1].textContent = result[1];
    message.classList.toggle('show');
    playAudio(msgAudio);
    setTimeout( () => {
      message.classList.toggle('show');
      playerScore.textContent = plrScore;
      computerScore.textContent = cptScore;
      buttons.forEach( btn => btn.classList.remove('stop'));
      buttons.forEach( btn => btn.addEventListener('click', playRound));
    },2000);
  }

  function playAudio(name) {
    const audio = document.getElementsByName(name)[0];
    audio.play();
  }
  
  function roundResult(playerSelection, computerSelection) {
    let resultString = "";
    let isWin = false;
    
    if (playerSelection === computerSelection) {
      resultString = ["It's a tie!", `${playerSelection} vs. ${playerSelection}`];
      msgAudio = playerSelection.toLowerCase();
      return resultString;
    }    
    if (playerSelection === 'Rock') {
      if (computerSelection === 'Scissors') {
        isWin = true;
        resultString = roundLog[0];
        msgAudio = 'rock';
      } else {
        resultString = roundLog[1];
        msgAudio = 'paper';
      }    
    }    
    if (playerSelection === 'Paper') {
      if (computerSelection === 'Rock') {
        isWin = true;
        resultString = roundLog[1];
        msgAudio = 'paper';
      } else {
        resultString = roundLog[2];
        msgAudio = 'scissors';
      }    
    }    
    if (playerSelection === 'Scissors') {
      if (computerSelection === 'Paper') {
        isWin = true;
        resultString = roundLog[2];
        msgAudio = 'scissors';
      } else {
        resultString = roundLog[0];
        msgAudio = 'rock';
      }    
    }    
    isWin === true ? plrScore++ : cptScore++;
    return resultString = isWin ? ['You Win!', resultString] : ['You Lose!', resultString];
  }    

  
  // if (playerScore === computerScore) {
  //   endResult = "This Game ends in a Tie - "; 
  // } else {
  //   if (playerScore > computerScore) {
  //     endResult = 'You Win this Game - ';
  //   } else {
  //     endResult = 'You Lose this Game - ';
  //   }
  // }
  // console.log(endResult + `${playerScore} : ${computerScore} !`);
  // console.log('Click "Play! - Button" to play again');

})();
