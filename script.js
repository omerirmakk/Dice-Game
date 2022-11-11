'use strict';

const modal = document.querySelector('.modal');
const close = document.querySelector('.close-modal');
const open = document.querySelector('.show-modal');
const main = document.querySelector('.main');
const playerFirst = document.querySelector('.player-0');
const playerSecond = document.querySelector('.player-1');
const score1 = document.getElementById('score-0');
const score2 = document.getElementById('score-1');
const currenttext0 = document.getElementById('current-text-0');
const currenttext1 = document.getElementById('current-text-1');
const dices = document.querySelector('.dices');

const currentscr1 = document.getElementById('current-0');
const currentscr2 = document.getElementById('current-1');

const btnNew = document.querySelector('.btnnew');
const btnRoll = document.querySelector('.btnroll');
const btnHold = document.querySelector('.btnhold');

let scores, currentScore, activePlayer, playing;
const reset = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score1.textContent = 0;
  score2.textContent = 0;
  currentscr1.textContent = 0;
  currentscr2.textContent = 0;
  currenttext0.textContent = 'Current';
  currenttext1.textContent = 'Current';

  dices.classList.add('hidden');
  playerFirst.classList.remove('player-winner');
  playerSecond.classList.remove('player-winner');
  playerFirst.classList.add('player-active');
  playerSecond.classList.remove('player-active');
};
reset();

const switching = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerFirst.classList.toggle('player-active');
  playerSecond.classList.toggle('player-active');
};
btnNew.addEventListener('click', reset);

btnRoll.addEventListener('click', () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    dices.classList.remove('hidden');
    dices.src = `contents/dice${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      switching();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      dices.classList.add('hidden');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');
      document.getElementById(`current-${activePlayer}`).textContent =
        'WINNER!!!';
      document.getElementById(`current-text-${activePlayer}`).textContent = '';
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');
    } else {
      switching();
    }
  }
});

open.addEventListener('click', () => {
  modal.classList.toggle('hidden');
  main.classList.toggle('blurback');
});
close.addEventListener('click', () => {
  modal.classList.add('hidden');
  main.classList.remove('blurback');
});
