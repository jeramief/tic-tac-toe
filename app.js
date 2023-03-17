
const gameBoard = document.querySelector('#gameboard')
const infoDisplay = document.querySelector('#info')
const startCells = [
  '', '', '', '', '', '', '', '', ''
]
let go = 'o'
infoDisplay.textContent = 'o goes first'

function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement('div')
    cellElement.classList.add('square')
    cellElement.id = index
    cellElement.addEventListener('click', addGo)
    gameBoard.append(cellElement)
  })
}
createBoard()

function addGo(e) {
  const goDisplay = document.createElement('div')
  goDisplay.classList.add(go)
  e.target.append(goDisplay)
  go = go === 'o' ? 'x' : 'o'
  infoDisplay.textContent = `It is now ${go}'s turn.`
  e.target.removeEventListener('click', addGo)
  checkScore()
}

function checkScore() {
  const allSquares = document.querySelectorAll('.square')
  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ]

  winningCombos.forEach(array => {
    const oWins = array.every(cell =>
      allSquares[cell].firstChild?.classList.contains('o'))

    if(oWins) {
      infoDisplay.textContent = 'o Wins!'
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      return
    }
  })

  winningCombos.forEach(array => {
    const xWins = array.every(cell =>
      allSquares[cell].firstChild?.classList.contains('x'))

    if(xWins) {
      infoDisplay.textContent = 'x Wins!'
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      return
    }
  })
}
