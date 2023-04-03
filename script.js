'use strict';

(function rockPaperScissors() {

  const buttons = document.querySelectorAll('#player-hands button');
  const message = document.querySelector('#message');
  const info1 = document.querySelector('#info1');
  const info2 = document.querySelector('#info2');
  const playerScoring = document.querySelector('#player-score p');
  const machineScoring = document.querySelector('#machine-score p');
  const gameOver = document.querySelector('#game-over');
  const gameOverMessage = document.querySelector('#g-o-message');
  const playAgain = document.querySelector('#play-again');
  const credits = document.querySelector('#credits');
  const creditsTab = document.querySelector('#credits-tab');
  const links = document.querySelectorAll('#credits a');

  const choice = ['Rock', 'Paper', 'Scissors'];
  const result = ["You Lose!", "It's A Tie!", "You Win!"];
  const resultVerb = ["beats", "covers", "cuts"];
  let info1Text = '', info2Text = '';
  let playerScore = 0, machineScore = 0;
  let playerChoice = '', machineChoice = '';

  function toggleTab() {
    creditsTab.classList.toggle('display-links');
    if (creditsTab.classList.contains('display-links')) {
      credits.classList.add('display-links');
      links.forEach( a => a.classList.add('display-links'));
    } else {
      credits.classList.remove('display-links');
      links.forEach( a => a.classList.remove('display-links'));
    }
    playAudio('Click');
  }

  function resetGame() {
    playerScore = 0, machineScore = 0;
    playerScoring.textContent = playerScore;
    machineScoring.textContent = machineScore;
    playAgain.removeEventListener('click', resetGame);
    gameOver.classList.remove('show');
    buttons.forEach( button => {
      button.classList.remove('blur');
    });
    game();
  }

  function checkScoring() {
    if (playerScore < 5 && machineScore < 5) return;
    if (playerScore > machineScore) {
      gameOverMessage.textContent = 'You Win This Game!';
      playAudio('Winner');
    } else {
      gameOverMessage.textContent = 'You Lose This Game!';
      playAudio('Loser');
    }
    buttons.forEach( button => {
      button.removeEventListener('click', playRound)
      button.classList.add('blur');
    });
    gameOver.classList.add('show');
    playAgain.addEventListener('click', resetGame);
  }

  function closeMessage() {
    message.classList.remove('show');
    message.removeEventListener('transitionend', closeMessage);
    playerScoring.textContent = playerScore;
    machineScoring.textContent = machineScore;
    document.querySelector(`div[data-machine = ${machineChoice}]`).classList.remove('move');
    document.querySelector(`button[data-player = ${playerChoice}]`).classList.remove('move');
    checkScoring();
  }

  function evalSelections(playerSelection) {
  if (playerSelection === choice[1]) {
    info1Text = result[1];
    info2Text = `${choice[1]} vs. ${choice[1]}!`;
    playAudio(choice[1]);
  } else if (playerSelection === choice[2]) {
    info1Text = result[2];
    info2Text = `${choice[2]} ${resultVerb[2]} ${choice[1]}!`;
    playAudio(playerSelection);
    playerScore++;
  } else {
    info1Text = result[0];
    info2Text = `${choice[1]} ${resultVerb[1]} ${choice[0]}!`;
    playAudio(choice[1]);
    machineScore++;
  }
  info1.textContent = info1Text;
  info2.textContent = info2Text;
  }

  function playAudio(sound) {
    const audio = document.querySelector(`audio[data-audio = ${sound}]`);
    audio.currentTime = 0;
    audio.play();
  }

  function machinePlay() {
    machineChoice = choice[Math.floor(Math.random() * 3)];
    document.querySelector(`div[data-machine = ${machineChoice}]`).classList.add('move');
    while(choice[1] !== machineChoice) {
      choice.push(choice.shift());
      resultVerb.push(resultVerb.shift());
    }
  }

  function playRound() {
    playAudio('Click');
    playerChoice = this.dataset.player;
    document.querySelector(`button[data-player = ${playerChoice}]`).classList.add('move');
    machinePlay()
    evalSelections(this.dataset.player);
    message.addEventListener('transitionend', closeMessage);
    message.classList.add('show');
  }

  function game() {
    buttons.forEach( button => button.addEventListener('click', playRound));
  }

  creditsTab.addEventListener('click', toggleTab);
  links.forEach( a => a.addEventListener('click', toggleTab));

  game();

})();
