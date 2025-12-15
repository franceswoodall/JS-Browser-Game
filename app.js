

/*-------------------------------- Constants ----------------------------------*/
const Board = 0; 

const maxWordLength = 5; 

const maxRows = 6; 

import {solutionWords} from "./wordList.js"; 


/*---------------------------- Variables (state) ----------------------------*/
let currentRound = 0; 

let winningWord; 

let currentGuess; 

let currentRow = 0; 

let currentTileIndex = 0;  

/*------------------------ Cached Element References ------------------------*/

const keyBtns = document.querySelectorAll('.key'); 

const enterBtn = document.querySelector('#enter');

const backspaceBtn = document.querySelector('#backspace'); 

const messageEl = document.querySelector('#game-message'); 

const nextRoundBtn = document.querySelector('#next-round-button'); 


/*-------------------------------- Functions --------------------------------*/

const gameInit = () => {
    winningWord = solutionWords[currentRound]; 
    console.log(`Starting Round 1. Solution is ${winningWord}`); 
}




const updateGrid = (letter) => {
    const tileId = `tile-${currentRow}-${currentTileIndex}`; 
    const currentTile = document.getElementById(tileId); 
    if (currentTile && currentTileIndex <5) {
        currentTile.textContent = letter; 
        currentTileIndex++; 
    }
}; 

const clickEnter = () => {
    if (currentTileIndex === maxWordLength) {
        const playerGuess = document.querySelectorAll(`#row-${currentRow} .tile`); 
        let currentGuessString = ''; 
        playerGuess.forEach(guess => {
            currentGuessString += guess.textContent; 
        }); 

        const guessUpper = currentGuessString.toUpperCase(); 
        const winningUpper = winningWord.toUpperCase(); 

        evaluateGuess(guessUpper); 

        if (guessUpper === winningUpper) {
            console.log('Congratulations, you have guessed the correct word. Continue to next round!')

            showWin(); 
        }
        currentRow ++; 
        currentTileIndex = 0; 
    } else {
        updateMessage(); 
    }
}; 

const updateMessage = () => {
    if (currentTileIndex < maxWordLength) {
        messageEl.textContent = `Not enough letters in this row!`; 
        setTimeout(() => {
            messageEl.textContent = ''; 
        }, 2000); 
    }
}

const clickBackspace = () => {
    if (currentTileIndex > 0) {
        currentTileIndex--; 

        const tileId = `tile-${currentRow}-${currentTileIndex}`; 
        const currentTile = document.getElementById(tileId); 

        if (currentTile) {
            currentTile.textContent = ''; 
        }
    }
}; 

const evaluateGuess = (playerGuess) => {
   const solution = winningWord.toUpperCase(); 
   
   const guessTiles = document.querySelectorAll(`#row-${currentRow} .tile`); 
   guessTiles.forEach((titleElement, index) => {

    const guessedLetter = playerGuess[index]; 
    const solutionLetter = solution[index]; 

    if (guessedLetter === solutionLetter) {
        titleElement.classList.add('correct-placement'); 
    }
    else if (solution.includes(guessedLetter)) {
        titleElement.classList.add('incorrect-placement'); 
    }
    else {
        titleElement.classList.add('incorrect-letter'); 
    }
   })
}

const showWin = () => {
    messageEl.textContent = 'Congratulations! Click next round button to continue'; 
    nextRoundBtn.computedStyleMap.display = 'block'; 
}

const advanceToNextRound = () => {
    nextRoundBtn.computedStyleMap.display = "none"; 
    messageEl.textContent = ''; 
    clearBoard(); 
    currentRound ++; 
    if (currentRound < solutionWords.length) {
        winningWord = solutionWords[currentRound]; 
        console.log(`Starting Round ${currentRound + 1}. New Solution: ${winningWord}`); 
    } else {
        messageEl.textContent = 'Woah ho ho! Icy you have completed the game, congratulations!'
    }
}; 

const clearBoard = () => {
    currentRow = 0; 
    currentTileIndex = 0; 

    const allTiles = document.querySelectorAll('.tile'); 
    allTiles.forEach(tile => {
        tile.textContent = ''; 

        tile.classList.remove('correct-placement'); 
        tile.classList.remove('incorrect-placement'); 
        tile.classList.remove('incorrect-letter'); 
    }); 
}





/*----------------------------- Event Listeners ----------------------------*/

gameInit(); 

keyBtns.forEach(btn => {
    btn.addEventListener('click', (evt) => {
        const clickedBtnElement = evt.target;
        const letterAsString = clickedBtnElement.textContent; 
        updateGrid(letterAsString); 
        console.log('clicked letter as string', letterAsString); 
    }); 
}); 

enterBtn.addEventListener('click', (evt) => {
     console.log('Enter key clicked'); 
        clickEnter(); 
}); 

backspaceBtn.addEventListener('click', (evt) => {
    console.log('Backspace key clicked'); 
    clickBackspace(); 
}); 

nextRoundBtn.addEventListener('click', (evt) => {
    advanceToNextRound();
})
