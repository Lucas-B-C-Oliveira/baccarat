import Game from './components/Game.jsx'
import Control from './components/Control.jsx'
import { useRef, useState } from 'react'

function App() {

  const [cellsOfTopInGame, setCellsOfTopInGame] = useState([])
  const [cellsOfBottomInGame, setCellsOfBottomInGame] = useState([])
  const currentMatch = useRef(0)
  const columnOfTop = useRef(0)
  const lineOfTop = useRef(0)

  const lineOfBottom = useRef(0)
  const columnOfBottom = useRef(0)

  const lastLockedLineOfBottom = useRef(7)
  const oldBallOfBottomCell = useRef(0)
  const oldCorrectColumnOfBottomCell = useRef(0)
  const oldCorrectLineOfBottomCell = useRef(0)
  const lastLockedColumnOfBottom = useRef(0)
  const initialLineFree = useRef(0)
  const wasInALongSequence = useRef(false)
  const lastFreeLineOfLockedColumn = useRef(false)

  const X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL = 3.25

  const Y_STARTING_POS_OF_TOP_CELL = 1.9
  const Y_STARTING_POS_OF_BOTTOM_CELL = 22.18

  const X_STARTING_POS_OF_CELL = 2.2

  const updateCurrentMatch = (newImage) => {

    if (currentMatch.current > 107) return

    if (currentMatch.current === 0) {

      /// ##### Top Cells

      const posOfTopCell = {
        x: `${X_STARTING_POS_OF_CELL}rem`,
        y: `${Y_STARTING_POS_OF_TOP_CELL}rem`
      }

      const newCellOfTop = {
        key: currentMatch.current,
        position: posOfTopCell,
        image: newImage,
      }

      /// ##### Bottom Cells

      const posOfBottomCell = {
        x: `${X_STARTING_POS_OF_CELL}rem`,
        y: `${Y_STARTING_POS_OF_BOTTOM_CELL}rem`
      }

      const newCellOfBottom = {
        key: currentMatch.current,
        position: posOfBottomCell,
        image: newImage,
      }

      setCellsOfBottomInGame(prevState => [...prevState, newCellOfBottom])
      setCellsOfTopInGame(prevState => [...prevState, newCellOfTop])
      oldBallOfBottomCell.current = newImage

    }
    else {

      lineOfTop.current = lineOfTop.current + 1

      if (currentMatch.current % 6 === 0) {
        columnOfTop.current = columnOfTop.current + 1
        lineOfTop.current = 0

      }

      const newYPosOfTopCell = Y_STARTING_POS_OF_TOP_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * lineOfTop.current)
      const newXPosOfTopCell = X_STARTING_POS_OF_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * columnOfTop.current)

      const posOfTopCell = {
        x: `${newXPosOfTopCell}rem`,
        y: `${newYPosOfTopCell}rem`
      }

      const newCellOfTop = {
        key: currentMatch.current,
        position: posOfTopCell,
        image: newImage,
      }

      /// ##### Bottom Cells

      let newYPosOfBottomCell = 0
      let newXPosOfBottomCell = 0



      if (oldBallOfBottomCell.current === newImage) {

        /// #### Put the ball down


        if (lineOfBottom.current === lastLockedLineOfBottom.current) {

          columnOfBottom.current = columnOfBottom.current + 1

          newYPosOfBottomCell = Y_STARTING_POS_OF_BOTTOM_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * lastLockedLineOfBottom.current)
          newXPosOfBottomCell = X_STARTING_POS_OF_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * columnOfBottom.current)

          lastLockedColumnOfBottom.current = columnOfBottom.current
          lastFreeLineOfLockedColumn.current = true




        }
        else {

          lineOfBottom.current = lineOfBottom.current + 1
          oldCorrectColumnOfBottomCell.current = columnOfBottom.current

          wasInALongSequence.current = true
          lastLockedColumnOfBottom.current = columnOfBottom.current
          oldCorrectLineOfBottomCell.current = lineOfBottom.current

          newYPosOfBottomCell = Y_STARTING_POS_OF_BOTTOM_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * lineOfBottom.current)
          newXPosOfBottomCell = X_STARTING_POS_OF_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * columnOfBottom.current)
        }

      }
      else {

        lineOfBottom.current = initialLineFree.current

        if (wasInALongSequence.current) {
          columnOfBottom.current = oldCorrectColumnOfBottomCell.current
          wasInALongSequence.current = false
        }

        if (lastFreeLineOfLockedColumn.current) {
          lastLockedLineOfBottom.current = lastLockedLineOfBottom.current - 1
          lastFreeLineOfLockedColumn.current = false

        }

        if (columnOfBottom.current >= 35) {
          initialLineFree.current = initialLineFree.current + 1
          columnOfBottom.current = lastLockedColumnOfBottom.current


          if (oldCorrectLineOfBottomCell.current < (initialLineFree.current + 1)) {

            lastLockedColumnOfBottom.current = -1
          }

        }

        console.log(columnOfBottom.current)

        // if (columnOfBottom.current + 1 >= 35) {
        //   columnOfBottom.current = -1
        // }

        columnOfBottom.current = columnOfBottom.current + 1

        newYPosOfBottomCell = Y_STARTING_POS_OF_BOTTOM_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * initialLineFree.current)
        newXPosOfBottomCell = X_STARTING_POS_OF_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * columnOfBottom.current)

      }

      const posOfBottomCell = {
        x: `${newXPosOfBottomCell}rem`,
        y: `${newYPosOfBottomCell}rem`
      }

      const newCellOfBottom = {
        key: currentMatch.current,
        position: posOfBottomCell,
        image: newImage,
      }


      //////_____________________
      oldBallOfBottomCell.current = newImage
      setCellsOfTopInGame(prevState => [...prevState, newCellOfTop])
      setCellsOfBottomInGame(prevState => [...prevState, newCellOfBottom])


    }

    currentMatch.current = currentMatch.current + 1

  }

  return (
    <>
      <Game cellsOfTopInGame={cellsOfTopInGame} cellsOfBottomInGame={cellsOfBottomInGame} />
      <Control updateCurrentMatch={updateCurrentMatch} />
      <button
        onClick={() => {
          setCellsOfTopInGame([])
          currentMatch.current = 0
          columnOfTop.current = 0
          lineOfTop.current = 0
        }}
        type="button"
        className="tw-btn-red"
      >LIMPAR!!!!
      </button>

    </>
  )
}

export default App
