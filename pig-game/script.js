'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions;
diceEl.classList.add('hidden');
let scores, currentScore, turn;
let playing = true;

const init = () => {
    score0El.textContent = 0;
    score1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    scores = [0,0];
    currentScore = 0;
    turn = 0;
    playing = true;
}

init();
const switchPlayer = () =>{
    document.getElementById(`current--${turn}`).textContent = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    turn = turn === 0 ? 1: 0;
    currentScore = 0;
}

//rolling dice functionality
btnRoll.addEventListener('click', ()=>{
    if(playing){
        //1. generate random dice roll
        const dice = Math.trunc(Math.random()*6)+1;

        //2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. check for rolled 1
        if(dice!==1){
            // add dice to current score
            currentScore+=dice;
            document.getElementById(`current--${turn}`).textContent = currentScore;
        

        } else{
            // switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', ()=>{   
    if(playing){
        //1. add current score to existing score
        scores[turn] += currentScore;
        document.getElementById(`score--${turn}`).textContent = scores[turn];

        //2. if score>=100 win
        if(scores[turn]>=100){
            document.querySelector(`.player--${turn}`).classList.add('player--winner');
            document.querySelector(`.player--${turn}`).classList.add('player--active');
            playing = false;
        }

        else switchPlayer();
    }
})

btnNew.addEventListener('click', init);