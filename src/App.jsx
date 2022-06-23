import Game from './components/Game.jsx'
import Control from './components/Control.jsx'
import { useState } from 'react'

import './styles/global.css'


function App() {

  const [currentMatch, setCurrentMatch] = useState(0)

  const [cellsOfUpInGame, setCellsOfUpInGame] = useState([])
  const [columnOfUp, setColumnOfUp] = useState(0)
  const [lineOfUp, setLineOfUp] = useState(0)


  const updateCurrentMatch = (newImage) => {

    if (currentMatch > 107) return

    const newMatch = currentMatch + 1

    const oldCellsOfUpInGame = cellsOfUpInGame

    let newColumnOfUp = columnOfUp
    let newLineOfUp = lineOfUp


    if (currentMatch === 0) {

      const posOfUpCell = 'absolute top-[1.9rem] left-[2.2rem]'
      const sizeOfUpCell = 'h-[2.5rem] w-[2.5rem]'

      const newCellOfUp = {
        key: currentMatch,
        position: `${posOfUpCell} ${sizeOfUpCell}`,
        image: newImage,
      }

      oldCellsOfUpInGame.push(newCellOfUp)

    }
    else {

      newLineOfUp++

      if (currentMatch % 6 === 0) {
        newColumnOfUp++
        newLineOfUp = 0
      }


      const yPosMultiplierOfUpCell = 3.25
      const yStartingPosOfUpCell = 1.9
      const newYPosOfUpCell = yStartingPosOfUpCell + (yPosMultiplierOfUpCell * newLineOfUp)

      const xPosMultiplierOfUpCell = 3.25
      const xStartingPosOfUpCell = 2.2
      const newXPosOfUpCell = xStartingPosOfUpCell + (xPosMultiplierOfUpCell * newColumnOfUp)

      const posOfUpCell = `absolute top-[${newYPosOfUpCell}rem] left-[${newXPosOfUpCell}rem]`
      const sizeOfUpCell = 'h-[2.5rem] w-[2.5rem]'

      const newCellOfUp = {
        key: currentMatch,
        position: `${posOfUpCell} ${sizeOfUpCell}`,
        image: newImage,
      }

      oldCellsOfUpInGame.push(newCellOfUp)

    }

    setCellsOfUpInGame(oldCellsOfUpInGame)
    setColumnOfUp(newColumnOfUp)
    setLineOfUp(newLineOfUp)
    setCurrentMatch(newMatch)

  }

  return (
    <>
      <Game cellsOfUpInGame={cellsOfUpInGame} />
      <Control updateCurrentMatch={updateCurrentMatch} />
    </>
  )
}

export default App
