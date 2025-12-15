

/*-------------------------------- Constants ----------------------------------*/

const maxWordLength = 5; 

const maxRows = 6; 

const maxGameRounds = 10; 

import {solutionWords} from "./wordList.js"; 

/*---------------------------- Variables (state) ----------------------------*/

let currentRound = 0; 

let winningWord; 

let currentRow = 0; 

let currentTileIndex = 0;  

/*------------------------ Cached Element References ------------------------*/

const keyBtns = document.querySelectorAll('.key'); 

const enterBtn = document.querySelector('#enter');

const backspaceBtn = document.querySelector('#backspace'); 

const messageEl = document.querySelector('#game-message'); 

const nextRoundBtn = document.querySelector('#next-round-button'); 

const roundTrackerEl = document.querySelector('#round-tracker'); 

/*-------------------------------- Functions --------------------------------*/

const updateRoundDisplay = () => {
    const displayRoundNumber = currentRound +1; 
    roundTrackerEl.textContent = `Round: ${displayRoundNumber}`; 
}

const gameInit = () => {
    winningWord = solutionWords[currentRound]; 
    // console.log(`Starting Round 1. Solution is ${winningWord}`); 
    updateRoundDisplay(); 
}


const updateGrid = (letter) => {
    if (currentTile >= currentTileIndex <5) {
        return; 
}
    const tileId = `tile-${currentRow}-${currentTileIndex}`; 
    const currentTile = document.getElementById(tileId); 

    if (currentTile) {
        currentTile.textContent = letter; 
        currentTileIndex++; 
    }
}; 

const clickEnter = () => {
    if (enterBtn.disabled) {
        return; 
    }
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

            enterBtn.disabled = true; 

            if (currentRound === maxGameRounds -1) {
                messageEl.textContent = 'Woah ho ho! Congratulations, icy you have completed the game! Cracker work!'; 

            } else {

                showWin()
            }
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

const updateKeyboardColor = (letter, status) => {
    const keyEl = document.getElementById(letter); 
    if (!keyEl.classList.contains('correct-placement') && (!keyEl.classList.contains('incorrect-placement'))) {
        keyEl.classList.add(status); 
    }; 
}

const resetKeyboardColors = () => {
    keyBtns.forEach((key) => {
        key.classList.remove('correct-placement'); 
        key.classList.remove('incorrect-placement'); 
        key.classList.remove('incorrect-letter'); 
    }); 
}; 


const evaluateGuess = (playerGuess) => {
   const solution = winningWord.toUpperCase(); 
   const guessTiles = document.querySelectorAll(`#row-${currentRow} .tile`); 
   
   guessTiles.forEach((tile, index) => {
    const guessedLetter = playerGuess[index]; 
    const solutionLetter = solution[index];

    let keyStatus = 'incorrect-letter'; 

    if (guessedLetter === solutionLetter) {
        tile.classList.add('correct-placement'); 
        keyStatus = 'correct-placement'; 
    }
    else if (solution.includes(guessedLetter)) {
        tile.classList.add('incorrect-placement'); 
        keyStatus = 'incorrect-placement'; 
    }
    else {
            tile.classList.add('incorrect-letter'); 
   }
   updateKeyboardColor(guessedLetter, keyStatus); 
    }); 
}; 


const showWin = () => {
    messageEl.textContent = 'Congratulations! Click next round button to continue'; 
    nextRoundBtn.style.display = 'block'; 
}


const advanceToNextRound = () => {
    nextRoundBtn.style.display = "none"; 
    messageEl.textContent = ''; 
    clearBoard(); 
    resetKeyboardColors(); 
    enterBtn.disabled = false; 

    currentRound ++; 

    if (currentRound < maxGameRounds) {
        winningWord = solutionWords[currentRound]; 
        console.log(`Starting Round ${currentRound + 1}. New Solution: ${winningWord}`); 
        updateRoundDisplay(); 
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
