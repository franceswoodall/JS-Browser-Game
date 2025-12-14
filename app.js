
// **Game Start**
// Player needs a landing page: empty grid for guesses & alphabet btns (y)
// Player needs to be able to click btn (any letter) to start game 





/*-------------------------------- Constants ----------------------------------*/
const Board = 0; 

const maxWordLength = 5; 

const maxRows = 6; 


/*---------------------------- Variables (state) ----------------------------*/
let key; 

let winningWord; 

let currentGuess; 

let gameState;

let letterStatus; 

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
}); 
       

