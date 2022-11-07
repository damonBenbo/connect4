/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 
 const startbtn = document.getElementById('start');
 const resetbtn = document.getElementById('reset');
 
 let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 let player = document.getElementById('player');
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
 
   //this iterates over the value of height/width (not by length) to create empty/null board that is 6x7
 
   for (let h = 0; h < HEIGHT; h++) {
     let row = [];
     for (let w = 0; w < WIDTH; w++) {
       row.push(null);
     }
     board.push(row);
   }
   return
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
 
   let htmlBoard = document.getElementById("board");
 
   // TODO: add comment for this code
 
   // this selects, adds the ID of column-top, and adds event listener to it to handle clicks for piece placement
 
   let top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
 
   // This creates the "top" area above the board
 
   for (let x = 0; x < WIDTH; x++) {
     let headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
 
   // TODO: add comment for this code
 
   //This creats the game board, sets id for "row", then iterates through until values Height/Width are met to create the size of the board
 
   //it then appends each row to make board, adds the id of x and y placement based on when it was placed within the loop
 
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   for (let y = HEIGHT - 1; y > -1; y--) {
     if (!board[y][x]) {
       return y;
     }
   }
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
 
   //places in cell and adds class to piece placed for p1 or p2
 
   const playerPiece = document.createElement('div');
   playerPiece.classList.add('piece');
 
   if (currPlayer === 1) {
     playerPiece.classList.add('p1');
   } else {
     playerPiece.classList.add('p2');
   }
   const position = document.getElementById(`${y}-${x}`);
   position.append(playerPiece);
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // TODO: pop up alert message
 
   //sets timeout and adds class "done" to the "game" element
 
   setTimeout(() => {
     if (confirm(msg)) {
       window.location.reload();
     }
   }, 500);
 
   let game = document.getElementById('game');
   game.classList.add('done');
 
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   let x = +evt.target.id;
 
   // shows whos turn is current
   if (currPlayer === 1) {
     player.textContent = `Its player ${2}'s turn`;
     player.style.color = 'rgb(0, 0, 255)';
   } else {
     player.textContent = `Its player ${1}'s turn`;
     player.style.color = 'rgb(255, 0, 0)';
   }
 
   // get next spot in column (if none, ignore click)
   const y = findSpotForCol(x);
 
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
 
   board[y][x] = currPlayer;
 
   placeInTable(y, x);
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won! Would you like to play again?`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
 
   //this checks over every cell/row in array to determine a tie game
   if (board.every((cell) =>
     cell.every((row) =>
       row))) {
     return endGame('Its a tie!');
   }
   // switch players
   // TODO: switch currPlayer 1 <-> 2
 
   // Ternary op to check and switch player
   currPlayer = currPlayer === 1 ? 2 : 1;
 
 
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
   //this code goes through and lists possible win conditions?
   //ex horiz shows winning sequence for if y placed a 4 pieces horizontally and vert for 4 pieces vertical
 
   //then a conditional is added to fit winning conditions and test if/or it is true, then returns true if conditions are met
 
   for (let y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {
       let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 //this adds functionality to a button to start game, and switches current player display to player 1
 startbtn.addEventListener('click', function start() {
   makeBoard();
   makeHtmlBoard();
 
   player.textContent = `Player ${1}'s turn`
   player.style.color = 'rgb(250, 0, 0)';
   startbtn.disabled = true;
 });
 
 
 // this add functionality to reset button and reloads page
 resetbtn.addEventListener('click', function again() {
   window.location.reload();
 });
