

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

const resetBtn = document.querySelector('#reset-button'); 

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
    if (currentTileIndex >= maxWordLength) {
        return; 
}
    const tileId = `tile-${currentRow}-${currentTileIndex}`; 
    const currentTile = document.getElementById(tileId); 

    if (currentTile) {
        currentTile.textContent = letter; 
        currentTileIndex++; 
    }
}; 

const insufficientLetters = () => {
    messageEl.textContent = 'Not enough letters in this row!'; 
    setTimeout(() => {
        messageEl.textContent = ''; 
    }, 2000); 
}

const handleWin = (finalRound) => {
    enterBtn.disabled = true; 
    if (finalRound) {
        messageEl.textContent = 'Icy you have won the game! Merry Christmas, ya filthy animal'; 
    } else {
        messageEl.textContent = 'You are sleigh-in it! Click next round button'; 
        nextRoundBtn.style.display = 'block'; 

    }
}

const handleLoss = () => {
    enterBtn.disabled = true; 
    const roundsCompleted = currentRound; 

    let playerMessage = ''; 

    if (roundsCompleted >= 0 && roundsCompleted <=3) {
        playerMessage = 'Bah humbug! You scored ${roundsWon}/${maxGameRounds}. Click reset game to play again'; 
    } else if (roundsCompleted >=4 && roundsCompleted <=6) {
        playerMessage = 'Not snow bad! You must be a south pole elf. You scored ${roundsWon}/${maxGameRounds}. Click reset game to play again'; 
    } else if (roundsCompleted >= 7 && roundsCompleted <=9) {
        playerMessage = 'Cracker work, you are a rudolph! You scored ${roundsWon}/${maxGameRounds}. Click reset game to play again'; 
    } else 
        playerMessage = 'Son of a nutcracker you have won! You are officially a wise (hu)man'; 

const clickEnter = () => {
    if (enterBtn.disabled) {
        return; 
    }

    if (currentTileIndex < maxWordLength) {
        insufficientLetters(); 
        return; 
    }; 

    const currentRowElement = document.getElementById(`row-${currentRow}`); 
    const playerGuess = currentRowElement.querySelectorAll('.tile'); 

    let currentGuessString = ''; 
    playerGuess.forEach(guess => {
        currentGuessString += guess.textContent; 
    }); 

    const guessUpper = currentGuessString.toUpperCase(); 
    const winningUpper = winningWord.toUpperCase(); 
    evaluateGuess(guessUpper); 

    if (guessUpper === winningUpper) {
        const isFinalRound = (currentRound === maxGameRounds - 1);
        handleWin(isFinalRound); 
    }

    else if (currentRow === maxRows - 1) {
        console.log('loss condition met! calling handleLoss()'); 
        handleLoss(); 
    }

    else {
        // they move to next row 
    }

    currentRow ++; 
    currentTileIndex = 0; 
}; 

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

const resetGame = () => {
    currentRound = 0; 
    currentRound = 0; 
    currentTileIndex = 0; 
    clearBoard(); 
    resetKeyboardColors(); 
    gameInit(); 
    messageEl.textContent = ''; 
    nextRoundBtn.style.display = 'none'; 
    enterBtn.disabled = false; 
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

resetBtn.addEventListener('click', (evt) => {
    resetGame(); 
})
