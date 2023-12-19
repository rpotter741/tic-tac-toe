const Players = (function() {
    let playerCount = 0;
    let currentPlayers = [];

    let newPlayerBtn = document.querySelector("#newPlayer");
    newPlayerBtn.addEventListener('click', () => {
        if(playerCount == 0) {
            newPlayer();
        } else {
            newPlayer();
            newPlayerBtn.style = "display: none";
        }
    })

    function newPlayer() {
       playerCount++;

       PlayerOne = {
        name: "Player One",
        marker: "X",
       };

       PlayerTwo = {
        name: "Player Two",
        marker: "O",
       };

        if(playerCount >2) {
        alert("Only two people can play at a time");
        return;
       }

       let name = prompt("What is your name?","Steve");
       document.querySelector(`#player${playerCount}`).textContent = name;

       if(playerCount == 1) {
        PlayerOne.name = name;
        PlayerOne.marker = "X";
        currentPlayers.push(PlayerOne);
       } else {PlayerTwo.name = name;
         PlayerTwo.marker = "O";
        currentPlayers.push(PlayerTwo);       
       }
    }

    function reset() {
        playerCount = 0;
        newPlayerBtn.style = "display: block;"
        document.querySelector("#player1").textContent = "";
        document.querySelector("#player2").textContent = "";
    }

    return {
        newPlayer: newPlayer,
        reset: reset,
        players: currentPlayers,
    }

})()

const Game = (function () {
    turnNumber = 1;

    function Turn() {
        if(turnNumber == 0) {
            turnNumber = 1;
        }
        else {
            turnNumber = 0;
        }

        return turnNumber
    }

    function victory(i) {
        let message = document.querySelector("#popUpText");
        message.textContent = `${Players.players[i].name}` + " won!"
        popUp();

    }

    function stalemate() {
        let message = document.querySelector("#popUpText");
        message.textContent = "It's a draw!"
        popUp();
    }

    function popUp() {
        let overlay = document.querySelector("#overlay");
        let popUp = document.querySelector("#popUpBox");
        overlay.classList.remove("hidden");
        popUp.classList.remove("hidden");
    }

    function hidePopUp() {
        let overlay = document.querySelector("#overlay");
        let popUp = document.querySelector("#popUpBox");
        overlay.classList.add("hidden");
        popUp.classList.add("hidden");
    }

    return {
        victory: victory,
        Turn: Turn,
        popUp: popUp,
        hide: hidePopUp,
        draw: stalemate,
        
    }
})()

const gameBoard = (function () {
    let boardArray = ["","","","","","","","",""];

    //add change listener to check for winner
    let board = document.querySelector(".gameBoard");
    board.addEventListener('click', checkWin)

    //refresh game board
    let newGameBtn = document.querySelector("#newGame");
    newGameBtn.addEventListener('click',refreshBoard)

    function refreshBoard() {
        board.innerHTML = "";
        for(let i = 0; i < boardArray.length; i++) {
            boardArray[i] = "";
            gameSpace(i);
            
        }
        markBoard();
        Game.turnNumber = 1;
        Game.hide();
    }

    //create game space
    function gameSpace(i){

        let space = document.createElement("div");
        space.id = `gameSpace${i}`;
        space.classList.add("markerSpace");
        space.innerText = boardArray[i];
        board.appendChild(space);
    }

    //allow player input
    function markBoard() {
    let markerSpace = document.querySelectorAll(".markerSpace");
    markerSpace.forEach(space => {
        space.addEventListener('click', () => {
            if(space.textContent == "") {
            space.textContent = selectMark(Game.Turn())
            let place = space.id.slice(-1);
            boardArray[place] = space.textContent;
            } else return
           
           })
        })
    }

    function selectMark(i) {
        let mark = Players.players[i].marker;
        return mark;
    }

    function checkWin() {
        let board = boardArray;
       
        let topRow = board[0] + board[1] + board[2];
        let midRow = board[3] + board[4] + board[5];
        let botRow = board[6] + board[7] + board[8];
        let lefCol = board[0] + board[3] + board[6];
        let midCol = board[1] + board[4] + board[7];
        let rigCol = board[2] + board[5] + board[8];
        let lefDia = board[0] + board[4] + board[8];
        let rigDia = board[2] + board[4] + board[6];

        let xWin = "XXX";
        let oWin = "OOO";

        if(topRow == xWin || midRow == xWin || botRow == xWin || lefCol == xWin || midCol == xWin || rigCol == xWin || lefDia == xWin || rigDia == xWin) {
            Game.victory(0);
        } else if(topRow == oWin || midRow == oWin || botRow == oWin || lefCol == oWin || midCol == oWin || rigCol == oWin || lefDia == oWin || rigDia == oWin) {
            Game.victory(1);
        } else if(board.includes("")) {

        } else Game.draw();


        
    }

    return {
        refresh: refreshBoard,
        board: boardArray,
    }

})()

gameBoard.refresh();