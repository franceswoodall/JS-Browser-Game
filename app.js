

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
    nextRoundBtn.disabled = true; 
}

const updateGrid = (letter) => {
    if (currentTileIndex >= maxWordLength || nextRoundBtn.disabled === false) {
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
    showMessage('Yule need to add more letters!'); 
}

const handleWin = (finalRound) => {
    enterBtn.disabled = true; 

    if (finalRound) {
        showMessage(`Son of a nutcracker you have won! You are officially a wise (hu)man`, 0); 
        nextRoundBtn.disabled = true; 
    } else {
        showMessage('You are sleigh-in it! Click next round button', 0); 
        nextRoundBtn.disabled = false; 

    }
}; 

function showMessage(messageContent, duration = 2000) {
    const gameMessageElement = document.getElementById('game-message'); 
    gameMessageElement.innerText = messageContent; 
    
    gameMessageElement.classList.add('visible'); 

    if (duration > 0) {
    setTimeout(() => {
        gameMessageElement.classList.remove('visible'); 
    }, duration); 
    }
}; 

const handleLoss = () => {
    enterBtn.disabled = true; 
    const roundsCompleted = currentRound; 

    let playerMessage = ''; 

    if (roundsCompleted >= 0 && roundsCompleted <=3) {
        playerMessage = `Bah humbug! You scored ${roundsCompleted}/${maxGameRounds} you cotton-headed ninny muggin! Click reset game to play again`; 
    } else if (roundsCompleted >=4 && roundsCompleted <=6) {
        playerMessage = `Not snow bad! You must be a south pole elf. You scored ${roundsCompleted}/${maxGameRounds}. Click reset game to play again`; 
    } else if (roundsCompleted >= 7 && roundsCompleted <=9) {
        playerMessage = `Cracker attempt, you are a rudolph! You scored ${roundsCompleted}/${maxGameRounds}. Click reset game to play again`; 
    } else {
        playerMessage = `Son of a nutcracker you have won! You are officially a wise (hu)man`; 
    }
    showMessage(playerMessage, 0); 
    nextRoundBtn.disabled = true; 
}; 

const clickEnter = () => {
 

    if (enterBtn.disabled || nextRoundBtn.disabled === false) {
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
        return; 
    }

    else if (currentRow === maxRows - 1) {
        handleLoss(); 
        return; 
    }

    else {
        currentRow ++; 
        currentTileIndex = 0; 
    }
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
    } else if (solution.includes(guessedLetter)) {
        tile.classList.add('incorrect-placement'); 
        keyStatus = 'incorrect-placement'; 
    } else {
            tile.classList.add('incorrect-letter'); 
   }
   updateKeyboardColor(guessedLetter, keyStatus); 
    }); 
}; 


const advanceToNextRound = () => {
    messageEl.textContent = ''; 
    clearGrid(); 
    resetKeyboardColors(); 
    enterBtn.disabled = false; 
    nextRoundBtn.disabled = true; 

    currentRound ++; 

    if (currentRound < maxGameRounds) {
        winningWord = solutionWords[currentRound]; 
        // console.log(`Starting Round ${currentRound + 1}. New Solution: ${winningWord}`); 
        updateRoundDisplay(); 
    }
}; 

const clearGrid = () => {
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
    currentTileIndex = 0; 
    clearGrid(); 
    resetKeyboardColors(); 
    gameInit(); 
    messageEl.textContent = ''; 
    nextRoundBtn.disabled = true; 
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
}); 
