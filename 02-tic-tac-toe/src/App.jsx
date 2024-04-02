
import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"

import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { TURNS } from './constants'
import { checkWinner } from './logic/board'
import { saveToStorage, resetStorage } from './logic/storage'

let positions = []
let counter = 0

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // const [position, setPosition] = useState(() => {
  //   const positionsFromStorage = window.localStorage.getItem('position')
  //   return positionsFromStorage ? JSON.parse(positionsFromStorage) : []
  // })
  
  // null hay ganador, false es empate
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    // si hay un valor en el index de la board, no lo cambies
    if (board[index] || winner) return
    // actualiza el tablero
    const newBoard = [... board]
    console.log(newBoard.length)

    //actualiza posiciones
    // const positionsFromStorage = window.localStorage.getItem('position')

    // if(positionsFromStorage) {
    //   positions = JSON.parse(positionsFromStorage)
    // }

    positions.push(index)
    // console.log(positions, 'posiciones');
    if(positions.length > 6) {
      newBoard.splice(positions[counter], 1, null)
      counter++
    }

    console.log(newBoard)
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardar partida
    saveToStorage({
      board: newBoard, 
      turn: newTurn
    })
    // window.localStorage.setItem('positions', JSON.stringify(positions))

    // revisar ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      setWinner(newWinner)
      confetti()
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    positions = []
    counter = 0
    resetStorage()
    // window.localStorage.removeItem('positions')
    
  }

  return (
    <main className='board'>
      <h1>Tic, Tac, Toe</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return ( 
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn  === TURNS.X}>
        {TURNS.X}
        </Square>
        <Square isSelected= {turn === TURNS.O}>
        {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}>
      </WinnerModal>

    </main>
  )
}

export default App
