
type BoardProps = {
    board: Array<Array<string | null>>,
    handleClick: (row: number, cell: number) => void,
    disabled: boolean
}
const Board = ({board, handleClick, disabled}: BoardProps) => {
  return (
    <div className='board'>
        {board.map((row, rowIndex) => (
            <div key={rowIndex} className='board-row'>
                {row.map((cell, cellIndex) => (
                    <button disabled={disabled} key={cellIndex} className='board-cell' onClick={() => handleClick(rowIndex, cellIndex)}>
                        {cell}
                    </button>
                ))}
            </div>
        ))}
    </div>
  )
}

export default Board