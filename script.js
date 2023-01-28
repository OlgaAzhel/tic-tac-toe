// 1) Define required constants
const messageEl = document.querySelector('h1')
const playAgainBtn = document.querySelector('button')
const cellEls = [...document.querySelectorAll('#board > div')]

// 2) Define required variables used to track the state of the game
let board
let turn
let winner

let cellState = {
    '0': null,
    '-1': 'x',
    '1': 'o'
}

winSituations = {
    '0': [[1, 2], [4, 8], [3, 6]],
    '1': [[0, 2], [4, 7]],
    '2': [[0, 1], [5, 8], [4, 6]],
    '3': [[0, 6], [4, 5]],
    '4': [[1, 7], [2, 6], [0, 8], [3, 5]],
    '5': [[3, 4], [2, 8]],
    '6': [[0, 3], [2, 4], [7, 8]],
    '7': [[1, 4], [6, 8]],
    '8': [[0, 4], [2, 5], [6, 7]]
}


// 3) Create event listeners
document.getElementById('board').addEventListener('click', handleMove)
playAgainBtn.addEventListener('click', init)


// 4) Initialize game
init()

function init() {
    board = [0, 0, 0,
        0, 0, 0,
        0, 0, 0]
    turn = 1;
    winner = null;
    render()
}

function render() {
    renderBoard()
    renderMessage()
    renderControls()
}

function renderBoard() {
    board.forEach(function (cell, cellIdx) {
        const cellEl = document.getElementById(cellIdx)
        cellEl.innerHTML = cellState[board[cellIdx]]
    })

}

function renderMessage() {
    if (winner === 'T') {
        messageEl.innerText = "It's a Tie! Play again."
    } else if (winner) {
        messageEl.innerText = `Player ${cellState[winner].toUpperCase()} Wins!`
    } else {
        messageEl.innerText = `Player ${cellState[turn].toUpperCase()}'s Turn`
    }
}

function renderControls() {
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden'
}

function handleMove(evt) {
    const cellIdx = cellEls.indexOf(evt.target)
    if (cellIdx === -1) {
        return
    }
    evt.target.innerText = cellState[turn]
    board[cellIdx] = turn;
    turn *= -1;
    console.log(board)
    winner = getWinner(cellIdx)
    render()

}

function getWinner(moveIdx) {

    let win = 0
    let score
    let winArray = winSituations[moveIdx]
    console.log("this is move index:", moveIdx)
    winArray.forEach(function (arr) {
        score = 0
        arr.forEach(function(el) {
            if (board[moveIdx] === board[el]) {
                score = score + 1
                console.log("THIS IS CURRENT SCORE:", score)
            }
            
        })
        if (score === 2) {
            win = 1
        }

    })

    if (win !== 1 && board.indexOf(0) === -1) {
        return 'T'
    }

    if (win === 1) {
        return board[moveIdx]
    }

}