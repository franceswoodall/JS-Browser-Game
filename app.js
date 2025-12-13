
// **Game Start**
// Player needs a landing page: empty grid for guesses & alphabet btns (y)
// Player needs to be able to click btn (any letter) to start game 





/*-------------------------------- Constants ----------------------------------*/
const Board = 0; 



/*---------------------------- Variables (state) ----------------------------*/
let btn; 

let winningWord; 

let currentGuess; 

let gameState;

let letterStatus; 

let currentRow; 

let currentTile; 

/*------------------------ Cached Element References ------------------------*/

const alphabetBtns = document.querySelectorAll('.key'); 

/*-------------------------------- Functions --------------------------------*/

/*----------------------------- Event Listeners ----------------------------*/

// the player needs to be able to click a letter button that starts the game 
// the player needs to be able to click any letter button
// the letter button needs to appear on the grid 

alphabetBtns.forEach(btn => {
    btn.addEventListener('click', (evt) => {
        const clickedBtnElement = evt.target;
        const letterAsString = clickedBtnElement.textContent; 
        // console.log('clicked letter as string', letterAsString); 
    }); 
}); 