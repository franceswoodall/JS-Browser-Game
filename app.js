

/*-------------------------------- Constants ----------------------------------*/
const Board = 0; 

const maxWordLength = 5; 

const maxRows = 6; 

import {solutionWords} from "./wordList.js"; 


/*---------------------------- Variables (state) ----------------------------*/
let currentRound; 

let winningWord; 

let currentGuess; 

let currentRow = 0; 

let currentTileIndex = 0;  

/*------------------------ Cached Element References ------------------------*/

const keyBtns = document.querySelectorAll('.key'); 

const enterBtn = document.querySelector('#enter');

const backspaceBtn = document.querySelector('#backspace'); 

const messageEl = document.querySelector('#game-message'); 



/*-------------------------------- Functions --------------------------------*/

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

        if (currentGuessString === winningWord) {
            console.log('Congratulations, you have guessed the correct word. Continue to next round!'); 
        }
       // else if {
            // player is at less than 6 guesses 
        }
         //   console.log('Try again')
        }



//         currentRow ++; 
//         currentTileIndex = 0; 
//     } else {
//         updateMessage(); 
//     }
// }; 

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




/*----------------------------- Event Listeners ----------------------------*/

// the player needs to be able to click a letter button that starts the game 
// the player needs to be able to click any letter button
// the letter button needs to appear on the grid 

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
       
document.addEventListener('DOMContentLoaded', (evt) => {
    let currentRound = 0; 
    let winningWord = solutionWords[0]
    console.log(`Round 1 Solution is: ${winningWord}`); 
}); 
