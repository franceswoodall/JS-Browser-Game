
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

alphabetBtns.forEach(btn => {
    btn.addEventListener('click', (evt) => {
        console.log('clicked letter', evt.target.id); 
    }); 
}); 