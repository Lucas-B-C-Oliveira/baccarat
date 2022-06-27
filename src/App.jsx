import Game from './components/Game.jsx'
import Control from './components/Control.jsx'
import { useRef, useState } from 'react'


function App() {

  const [cellsOfUpInGame, setCellsOfUpInGame] = useState([])
  const currentMatch = useRef(0)
  const columnOfUp = useRef(0)
  const lineOfUp = useRef(0)


  const updateCurrentMatch = (newImage) => {

    if (currentMatch.current > 107) return

    if (currentMatch.current === 0) {

      const posOfUpCell = 'absolute top-[1.9rem] left-[2.2rem]'
      const sizeOfUpCell = 'h-[2.5rem] w-[2.5rem]'

      const newCellOfUp = {
        key: currentMatch.current,
        position: `${posOfUpCell} ${sizeOfUpCell}`,
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


      const yPosMultiplierOfUpCell = 3.25
      const yStartingPosOfUpCell = 1.9
      const newYPosOfUpCell = yStartingPosOfUpCell + (yPosMultiplierOfUpCell * lineOfUp.current)

      const xPosMultiplierOfUpCell = 3.25
      const xStartingPosOfUpCell = 2.2
      const newXPosOfUpCell = xStartingPosOfUpCell + (xPosMultiplierOfUpCell * columnOfUp.current)

      const posOfUpCell = `absolute top-[${newYPosOfUpCell}rem] left-[${newXPosOfUpCell}rem]`
      const sizeOfUpCell = 'h-[2.5rem] w-[2.5rem]'

      const newCellOfUp = {
        key: currentMatch.current,
        position: `${posOfUpCell} ${sizeOfUpCell}`,
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
    </>
  )
}

export default App
