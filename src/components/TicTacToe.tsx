import { useState, useEffect } from "react"
import Board from "./Board"

type BoardArray = Array<Array<string | null>>;
type Cell = string | null;

const checkWinner = (board: BoardArray): Cell => {
    const winningLines = [
        [board[0][0], board[0][1], board[0][2]], // top row
        [board[1][0], board[1][1], board[1][2]], // middle row
        [board[2][0], board[2][1], board[2][2]], // bottom row
        [board[0][0], board[1][0], board[2][0]], // left column
        [board[0][1], board[1][1], board[2][1]], // middle column
        [board[0][2], board[1][2], board[2][2]], // right column
        [board[0][0], board[1][1], board[2][2]], // diagonal top left to bottom right
        [board[0][2], board[1][1], board[2][0]], // diagonal top right to bottom left
    ]
    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i]
        if (a && a === b && a === c) {
            return a
        }   
    }

    return null
}

const makeComputerMove = (board: BoardArray): [number, number] => {
    const availableCells: [number, number][] = []
    board.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (!cell) availableCells.push([rowIndex, cellIndex])
        })
    })
    const randomIndex = Math.floor(Math.random() * availableCells.length)
    return availableCells[randomIndex]
}

const TicTacToe = () => {
    const [board, setBoard] = useState<BoardArray>([Array(3).fill(null), Array(3).fill(null), Array(3).fill(null)])
    const [player, setPlayer] = useState<string>('X')
    const [winner, setWinner] = useState<string | null>(null)
    const [disabled, setDisabled] = useState<boolean>(false)

    const handleOnClick = (row: number, cell: number) => {
        if (winner || board[row][cell]) return
        const updatedBoard = [...board]
        updatedBoard[row][cell] = player
        setBoard(updatedBoard)
        setWinner(checkWinner(updatedBoard))
        setPlayer('O')
        setDisabled(true)
    }

    const restartGame = () => {
        setBoard([Array(3).fill(null), Array(3).fill(null), Array(3).fill(null)])
        setPlayer('X')
        setWinner(null)
        setDisabled(false)
    }

    useEffect(() => {
        if (!winner && player === 'O') {
            setTimeout(() => {
                const [computerRow, computerCell] = makeComputerMove(board)
                const updatedComputerBoard = [...board]
                updatedComputerBoard[computerRow][computerCell] = player
                setBoard(updatedComputerBoard)
                setWinner(checkWinner(updatedComputerBoard))
                setPlayer('X')
                setDisabled(false)
            }, 400)
        }
    }, [player])
        

  return (
    <div className="game">
        <h1>TicTacToe</h1>
        <Board board={board} handleClick={handleOnClick} disabled={disabled}/>
        <button className="reset" onClick={restartGame}>Start Over</button>
        {winner && <h2>{winner === 'X' ? 'You win!' : 'Computer wins!'}</h2>}
        {!winner && !board.flat().includes(null) && <h2>It's a draw!</h2>}
    </div>
  )
}

export default TicTacToe