import { 
    TILE_STATUSES, 
    createBoard, 
    markTile, 
    revealTile,
    checkLose,
    checkWin,
     } from "./minesweeper.js"

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 20

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count')
const messageText = document.querySelector('.subtext')



board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener("click", () => {

            revealTile(board, tile)
            checkGameEnd()
        })

        tile.element.addEventListener("contextmenu", e => {

            e.preventDefault()
            markTile(tile)
            listMinesLeft()
        
        })
    })
})
boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES

function listMinesLeft() {

    const markedTilesCount = board.reduce((count, row) => {
      return (
        count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
      )
    }, 0)
  
    minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
  }

  function checkGameEnd() {

    const win = checkWin(board)
    const lose = checkLose(board)

    if (win || lose) {

        boardElement.addEventListener('click', stopProp,{ capture: true } )
        boardElement.addEventListener('contextmenu', stopProp,{ capture: true } )

        winningMessageElement.classList.add('show')

    }

    if (win) {

        winningMessageTextElement.textContent = "You Win"

    }

    if (lose) {

        winningMessageTextElement.textContent = "You Lose"
        board.forEach(row => {
            row.forEach(tile => {

                if(tile.mine) revealTile(board, tile)

            })
        })
    }

  }

  function stopProp(e) {

    e.stopImmediatePropagation()

  }

const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

restartButton.addEventListener('click', reloadPage)

function reloadPage() {

    window.location = window.location
    
}

window.addEventListener("contextmenu", function(e) {

    e.preventDefault()
    e.stopPropagation()

})
