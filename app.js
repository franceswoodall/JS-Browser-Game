import {solutionWords} from "./wordList.js"; 

/*-------------------------------- Constants ----------------------------------*/

const maxWordLength = 5; 

const maxRows = 6; 

const maxGameRounds = 10; 

/*---------------------------- Variables (state) ----------------------------*/

let winningWord = ''; 

let currentRound = 1; 

let currentRow = 0; 

let currentTileIndex = 0;  

let messageTimeout; 

/*------------------------ Cached Element References ------------------------*/

const keyBtns = document.querySelectorAll('.key'); 

const enterBtn = document.querySelector('#enter');

const backspaceBtn = document.querySelector('#backspace'); 

const messageEl = document.querySelector('#game-message'); 

const nextRoundBtn = document.querySelector('#next-round-button'); 

const roundTrackerEl = document.querySelector('#round-tracker'); 

const resetBtn = document.querySelector('#reset-button'); 

/*-------------------------------- Functions --------------------------------*/

const gameInit = () => {
    winningWord = solutionWords[currentRound]; 
    updateRoundDisplay(); 
    nextRoundBtn.disabled = true; 
}

const updateRoundDisplay = () => {
    const displayRoundNumber = currentRound +1; 
    roundTrackerEl.textContent = `Round ${displayRoundNumber}`; 
}

const updateGrid = (letter) => {
    if (currentTileIndex >= maxWordLength) 
        return; 
    if (nextRoundBtn.disabled === false) 
        return; 

    const tileId = `tile-${currentRow}-${currentTileIndex}`; 
    const currentTile = document.getElementById(tileId); 

    if (currentTile) {
        currentTile.textContent = letter; 
        currentTileIndex++; 
    }
}; 

const insufficientLetters = () => {
    showMessage('Icy you need to add more letters!'); 
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
    const keyEl = document.getElementById(letter.toUpperCase());
    if (!keyEl) return; 

    if (status === 'correct-placement') {
        keyEl.classList.remove('incorrect-placement', 'incorrect-letter'); 
        keyEl.classList.add('correct-placement'); 
    } else if (status === 'incorrect-placement' &&!keyEl.classList.contains('correct-placement')){
        keyEl.classList.remove('incorrect-letter');
        keyEl.classList.add('incorrect-placement'); 
    } else if (status === 'incorrect-letter' && !keyEl.classList.contains('correct-placement') && !keyEl.classList.contains('incorrect-placement')){
        keyEl.classList.add('incorrect-letter'); 
    }
}; 

function showMessage(messageContent, duration = 3000) {
    if (messageTimeout) clearTimeout(messageTimeout); 

    messageEl.innerText = messageContent; 
    messageEl.classList.add('visible'); 

    if (duration > 0) {
    setTimeout(() => {
        gameMessageElement.classList.remove('visible'); 
        messageTimeout = null; 
    }, duration); 
    }
}; 

const evaluateGuess = (playerGuess) => {
   const solution = winningWord.toUpperCase().split('');
   const guess = playerGuess.split('');  
   const guessTiles = document.querySelectorAll(`#row-${currentRow} .tile`); 
   
   const solutionLettersCounts = {}; 
   solution.forEach(letter => {
    solutionLettersCounts[letter] = (solutionLettersCounts[letter] || 0) +1; 
   }); 

   const statuses = Array(maxWordLength).fill('incorrect-letter'); 
   
   guess.forEach((letter, i) => {
    if (letter === solution[i]) {
        statuses[i] = 'correct-placement'; 
        solutionLettersCounts[letter]--; 
    }
   }); 

   guess.forEach((letter, i) => {
    if (statuses[i] !== 'correct-placement') {
        if (solution.includes(letter) && solutionLettersCounts[letter] >0) {
            statuses[i] = 'incorrect-placement'; 
            solutionLettersCounts[letter] --; 
        }
    }
   }); 

   guessTiles.forEach((tile, i) => {
    tile.classList.add(statuses[i]); 
    updateKeyboardColor(guess[i], statuses[i]); 
   }); 
}; 

const clickEnter = () => {
 
    if (enterBtn.disabled || !nextRoundBtn.disabled) {
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
    } else if (currentRow === maxRows - 1) {
        handleLoss(); 
        return; 
    } else {
        currentRow ++; 
        currentTileIndex = 0; 
    }
}; 

const handleWin = (finalRound) => {
    enterBtn.disabled = true; 

    if (finalRound) {
        showMessage(`Son of a nutcracker you have won! You are officially a wise man`, 0); 
        nextRoundBtn.disabled = true; 
    } else {
        showMessage('You are sleigh-in it! Click next round button', 0); 
        nextRoundBtn.disabled = false; 
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
        playerMessage = `Son of a nutcracker you have won! You are officially a wise man`; 
    }
    showMessage(playerMessage, 0); 
    nextRoundBtn.disabled = true; 
}; 

const advanceToNextRound = () => {
    currentRound ++; 

    if (currentRound < solutionWords.length && currentRound < maxGameRounds) {
        messageEl.textContent = ''; 
        messageEl.classList.remove('visible'); 
        clearGrid(); 
        resetKeyboardColors(); 
        enterBtn.disabled = false; 
        nextRoundBtn.disabled = true; 

        winningWord = solutionWords[currentRound]; 
        updateRoundDisplay(); 
        currentRow = 0; 
        currentTileIndex = 0; 
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
}; 

const resetKeyboardColors = () => {
    keyBtns.forEach((key) => {
        key.classList.remove('correct-placement'); 
        key.classList.remove('incorrect-placement'); 
        key.classList.remove('incorrect-letter'); 
    }); 
}; 

const resetGame = () => {
    currentRound = 0; 
    currentRow = 0; 
    currentTileIndex = 0; 
    clearGrid();
    resetKeyboardColors(); 
    gameInit(); 
    messageEl.textContent = ''; 
    messageEl.classList.remove('visible'); 
    nextRoundBtn.disabled = true; 
    enterBtn.disabled = false; 
}; 
   
gameInit(); 

/*----------------------------- Event Listeners ----------------------------*/

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
}); 

resetBtn.addEventListener('click', resetGame); 
