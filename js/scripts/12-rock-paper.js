let score = JSON.parse(localStorage.getItem('score'))  ||  {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  updateScoreElement();
//using  eventlistner
document.querySelector('.rock-btn').addEventListener('click', () =>{
    playGame('rock');    

});
document.querySelector('.paper-btn').addEventListener('click', () =>{
    playGame('paper');    

});
document.querySelector('.scissors-btn').addEventListener('click', () =>{
    playGame('scissors');    

});

//using event listner for the keyboard

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
        playGame('rock');
    } else if (event.key === 'p' || event.key
        === 'P') {
        playGame('paper');
    } else if (event.key === 's' || event.key === 'S') {
        playGame('scissors');
    }
})



function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "scissors") {
      result = "Tie.";
    } else if (computerMove === "rock") {
      result = "You lose!";
    } else if (computerMove === "paper") {
      result = "You win!";
    }
    
  } else if (playerMove === "paper") {
    if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose!";
    } else if (computerMove === "rock") {
      result = "You win!";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose!";
    } else if (computerMove === "scissors") {
      result = "You win!";
    }
  }
  if (result === "You win!") {
    score.wins += 1;
  } else if (result === "You lose!") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem('score',JSON.stringify(score));

 
  updateScoreElement();
  document.querySelector('.js-fight').innerHTML = `${result}`;
  document.querySelector('.js-result').innerHTML = ` 

  You 
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
 Computer`;
}

let isAutoPlaying= true;
let intervalId;
function autoPlay(){
    if(!isAutoPlaying){
        intervalId=setInterval(()=>{
            const playerMove= pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying= true;
    }
    else{
        clearInterval(intervalId);
        isAutoPlaying= false;
    }
}
   
    



function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}



function pickComputerMove() {
  const randomNum = Math.random();
  if (randomNum < 1 / 3 && randomNum >= 0) {
    computerMove = "rock";
  } else if (randomNum < 2 / 3 && randomNum >= 1 / 3) {
    computerMove = "paper";
  } else if (randomNum < 1 && randomNum >= 2 / 3) {
    computerMove = "scissors";
  }
  return computerMove;
}