import Game from './components/Game.jsx'
import Control from './components/Control.jsx'
import { useRef, useState } from 'react'

function App() {

  const [cellsOfUpInGame, setCellsOfUpInGame] = useState([])
  const currentMatch = useRef(0)
  const columnOfUp = useRef(0)
  const lineOfUp = useRef(0)

  const X_AND_Y_POS_MULTIPLIER_OF_UP_CELL = 3.25
  const Y_STARTING_POS_OF_UP_CELL = 1.9
  const X_STARTING_POS_OF_UP_CELL = 2.2

  const updateCurrentMatch = (newImage) => {

    if (currentMatch.current > 107) return

    if (currentMatch.current === 0) {

      const posOfUpCell = {
        x: `${X_STARTING_POS_OF_UP_CELL}rem`,
        y: `${Y_STARTING_POS_OF_UP_CELL}rem`
      }

      const newCellOfUp = {
        key: currentMatch.current,
        position: posOfUpCell,
        image: newImage,
      }

      setCellsOfUpInGame(prevState => [...prevState, newCellOfUp])

    }
    else {

      lineOfUp.current = lineOfUp.current + 1

      if (currentMatch.current % 6 === 0) {
        columnOfUp.current = columnOfUp.current + 1
        lineOfUp.current = 0

      }

      const newYPosOfUpCell = Y_STARTING_POS_OF_UP_CELL + (X_AND_Y_POS_MULTIPLIER_OF_UP_CELL * lineOfUp.current)
      const newXPosOfUpCell = X_STARTING_POS_OF_UP_CELL + (X_AND_Y_POS_MULTIPLIER_OF_UP_CELL * columnOfUp.current)

      const posOfUpCell = {
        x: `${newXPosOfUpCell}rem`,
        y: `${newYPosOfUpCell}rem`
      }

      const newCellOfUp = {
        key: currentMatch.current,
        position: posOfUpCell,
        image: newImage,
      }

      setCellsOfUpInGame(prevState => [...prevState, newCellOfUp])

    }

    currentMatch.current = currentMatch.current + 1

  }

  return (
    <>
      <Game cellsOfUpInGame={cellsOfUpInGame} />
      <Control updateCurrentMatch={updateCurrentMatch} />
      <button
        onClick={() => {
          setCellsOfUpInGame([])
          currentMatch.current = 0
          columnOfUp.current = 0
          lineOfUp.current = 0
        }}
        type="button"
        className="tw-btn-red"
      >LIMPAR!!!!
      </button>

    </>
  )
}

export default App
