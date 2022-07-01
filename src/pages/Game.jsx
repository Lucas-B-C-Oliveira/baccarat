import { useEffect, useReducer, useRef, useState } from 'react'
import Banker from '../assets/red-ball.png'
import Player from '../assets/blue-ball.png'
import Natural from '../assets/yellow-ball.png'
import TieHands from '../assets/green-ball.png'
import EmptyBall from '../assets/ball-empty.png'

function Game() {

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0); ///For Bar

  /// #### Cells/Balls Variables

  const [cellsOfTopInGame, setCellsOfTopInGame] = useState([])
  const [cellsOfBottomInGame, setCellsOfBottomInGame] = useState([])

  const currentMatch = useRef(0)

  const columnOfTop = useRef(0)
  const rowOfTop = useRef(0)

  const rowOfBottom = useRef(0)
  const columnOfBottom = useRef(0)

  const lastLockedRowOfBottom = useRef(7)
  const oldBallOfBottomCell = useRef(0)
  const oldCorrectColumnOfBottomCell = useRef(0)
  const lastLockedColumnOfBottom = useRef(0)
  const initialRowFree = useRef(0)
  const wasInALongSequenceOfEqualsBalls = useRef(false)
  const needToLockANewRow = useRef(false)

  const X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL = 3.25

  const Y_STARTING_POS_OF_TOP_CELL = 1.9
  const Y_STARTING_POS_OF_BOTTOM_CELL = 22.18

  const X_STARTING_POS_OF_CELL = 2.2

  /// #### Bar Variables

  const numberOfBankerInGame = useRef(0)
  const numberOfPlayerInGame = useRef(0)
  const numberOfTieInGame = useRef(0)
  const numberOfBallsInGame = useRef(0)

  const percentOfBankerInGame = useRef(0)
  const percentOfPlayerInGame = useRef(0)
  const percentOfTieInGame = useRef(0)

  const percentOfBankerForBar = useRef(0)
  const percentOfPlayerForBar = useRef(0)
  const percentOfTieForBar = useRef(0)

  /// #### Balls Variables

  const newImage = {
    0: EmptyBall,
    1: Banker,
    2: Player,
    3: TieHands,
    4: Natural
  }

  const updateCurrentMatch = (newImage) => {

    if (currentMatch.current > 107) return /// TODO: Later, need implement a clear top table game

    if (newImage !== 4) {
      /// ### Update Main Bar
      numberOfBallsInGame.current = numberOfBallsInGame.current + 1
      updateBar(newImage, numberOfBallsInGame.current)
    }

    if ((currentMatch.current % 6 === 0 && currentMatch.current != 0)) {
      columnOfTop.current = columnOfTop.current + 1
      rowOfTop.current = 0
    }

    const newYPosOfTopCell = Y_STARTING_POS_OF_TOP_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * rowOfTop.current)
    const newXPosOfTopCell = X_STARTING_POS_OF_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * columnOfTop.current)

    const posOfTopCell = {
      x: `${newXPosOfTopCell}rem`,
      y: `${newYPosOfTopCell}rem`
    }

    const newCellOfTop = {
      key: currentMatch.current + 10000,
      position: posOfTopCell,
      image: newImage,
    }

    rowOfTop.current = rowOfTop.current + 1

    /// ##### Bottom Cells

    let newYPosOfBottomCell = 0
    let newXPosOfBottomCell = 0

    if (oldBallOfBottomCell.current === newImage) {

      lastLockedRowOfBottom.current = columnOfBottom.current > lastLockedColumnOfBottom.current ? 7 : lastLockedRowOfBottom.current

      if (rowOfBottom.current === lastLockedRowOfBottom.current) {
        /// ### Moving the ball to the LEFT, modifying the COLUMN

        columnOfBottom.current = columnOfBottom.current + 1

        newYPosOfBottomCell = Y_STARTING_POS_OF_BOTTOM_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * lastLockedRowOfBottom.current)
        newXPosOfBottomCell = X_STARTING_POS_OF_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * columnOfBottom.current)

        lastLockedColumnOfBottom.current = columnOfBottom.current
        needToLockANewRow.current = true

      }
      else {
        /// #### Put the ball in DOWN

        rowOfBottom.current = rowOfBottom.current + 1
        oldCorrectColumnOfBottomCell.current = columnOfBottom.current
        wasInALongSequenceOfEqualsBalls.current = true

        newYPosOfBottomCell = Y_STARTING_POS_OF_BOTTOM_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * rowOfBottom.current)
        newXPosOfBottomCell = X_STARTING_POS_OF_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * columnOfBottom.current)
      }

    }
    else {
      /// Put the ball in LEFT

      rowOfBottom.current = initialRowFree.current

      if (wasInALongSequenceOfEqualsBalls.current) {
        columnOfBottom.current = oldCorrectColumnOfBottomCell.current
        wasInALongSequenceOfEqualsBalls.current = false
      }

      if (needToLockANewRow.current) {
        /// Need to block a new row when the sequence of like balls has reached a limit
        lastLockedRowOfBottom.current = lastLockedRowOfBottom.current - 1
        needToLockANewRow.current = false
      }

      columnOfBottom.current = currentMatch.current === 0 ? 0 : columnOfBottom.current + 1

      newYPosOfBottomCell = Y_STARTING_POS_OF_BOTTOM_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * initialRowFree.current)
      newXPosOfBottomCell = X_STARTING_POS_OF_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * columnOfBottom.current)

    }

    let clearGameTableFromBottom = false


    if (columnOfBottom.current >= 36) {
      /// Clear the bottom game table

      clearGameTableFromBottom = true

      columnOfBottom.current = 0
      rowOfBottom.current = 0
      oldCorrectColumnOfBottomCell.current = 0
      wasInALongSequenceOfEqualsBalls.current = false
      needToLockANewRow.current = false
      lastLockedRowOfBottom.current = 7
      initialRowFree.current = 0


      newYPosOfBottomCell = Y_STARTING_POS_OF_BOTTOM_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * rowOfBottom.current)
      newXPosOfBottomCell = X_STARTING_POS_OF_CELL + (X_AND_Y_POS_MULTIPLIER_OF_TOP_CELL * columnOfBottom.current)
    }

    const posOfBottomCell = {
      x: `${newXPosOfBottomCell}rem`,
      y: `${newYPosOfBottomCell}rem`
    }

    const newCellOfBottom = {
      key: currentMatch.current + 100,
      position: posOfBottomCell,
      image: newImage,
    }

    oldBallOfBottomCell.current = newImage

    if (clearGameTableFromBottom) setCellsOfBottomInGame([newCellOfBottom])
    else setCellsOfBottomInGame(prevState => [...prevState, newCellOfBottom])

    setCellsOfTopInGame(prevState => [...prevState, newCellOfTop])

    currentMatch.current = currentMatch.current + 1
  }

  const updateBar = (newBall = 0, numberOfBallsInGame = 0, isFirstRender = false) => {

    switch (newBall) {
      case 1:
        numberOfBankerInGame.current = numberOfBankerInGame.current + 1
        break;
      case 2:
        numberOfPlayerInGame.current = numberOfPlayerInGame.current + 1
        break;
      case 3:
        numberOfTieInGame.current = numberOfTieInGame.current + 1
        break;
    }

    percentOfBankerInGame.current = numberOfBallsInGame != 0 ? (numberOfBankerInGame.current * 100) / numberOfBallsInGame : 0
    percentOfPlayerInGame.current = numberOfBallsInGame != 0 ? (numberOfPlayerInGame.current * 100) / numberOfBallsInGame : 0
    percentOfTieInGame.current = numberOfBallsInGame != 0 ? (numberOfTieInGame.current * 100) / numberOfBallsInGame : 0

    percentOfBankerForBar.current = percentOfBankerInGame.current
    percentOfPlayerForBar.current = percentOfPlayerInGame.current
    percentOfTieForBar.current = percentOfTieInGame.current

    if (percentOfBankerInGame.current === 0 || percentOfPlayerInGame.current === 0 || percentOfTieInGame.current === 0) {

      let numberOfZero = 0
      let nonZeroNumber = 0

      let canIPutZeroInPercentOfBankerForBar = false
      let canIPutZeroInPercentOfPlayerForBar = false
      let canIPutZeroInPercentOfTieForBar = false

      if (percentOfBankerInGame.current === 0) numberOfZero++; else nonZeroNumber++
      if (percentOfPlayerInGame.current === 0) numberOfZero++; else nonZeroNumber++
      if (percentOfTieInGame.current === 0) numberOfZero++; else nonZeroNumber++


      if ((percentOfBankerInGame.current - (numberOfZero * (10 / nonZeroNumber))) >= percentOfBankerInGame.current) {
        percentOfBankerInGame.current = percentOfBankerInGame.current === 0 ? 10 : percentOfBankerInGame.current - (numberOfZero * (10 / nonZeroNumber))
      }
      else {
        if (percentOfBankerInGame.current === 0) { percentOfBankerInGame.current = 10; canIPutZeroInPercentOfBankerForBar = true }
        else if (percentOfBankerInGame.current < 10) percentOfBankerInGame.current = 10
      }

      if ((percentOfPlayerInGame.current - (numberOfZero * (10 / nonZeroNumber))) >= percentOfPlayerInGame.current) {
        percentOfPlayerInGame.current = percentOfPlayerInGame.current === 0 ? 10 : percentOfPlayerInGame.current - (numberOfZero * (10 / nonZeroNumber))
      }
      else {
        if (percentOfPlayerInGame.current === 0) { percentOfPlayerInGame.current = 10; canIPutZeroInPercentOfPlayerForBar = true }
        else if (percentOfPlayerInGame.current < 10) percentOfPlayerInGame.current = 10
      }

      if ((percentOfTieInGame.current - (numberOfZero * (10 / nonZeroNumber))) >= percentOfTieInGame.current) {
        percentOfTieInGame.current = percentOfTieInGame.current === 0 ? 10 : percentOfTieInGame.current - (numberOfZero * (10 / nonZeroNumber))
      }
      else {
        if (percentOfTieInGame.current === 0) { percentOfTieInGame.current = 10; canIPutZeroInPercentOfTieForBar = true }
        else if (percentOfTieInGame.current < 10) percentOfTieInGame.current = 10
      }

      if (percentOfBankerInGame.current === 10 && canIPutZeroInPercentOfBankerForBar) percentOfBankerForBar.current = 0
      if (percentOfPlayerInGame.current === 10 && canIPutZeroInPercentOfPlayerForBar) percentOfPlayerForBar.current = 0
      if (percentOfTieInGame.current === 10 && canIPutZeroInPercentOfTieForBar) percentOfTieForBar.current = 0

      if (numberOfZero === 3) {
        percentOfBankerInGame.current = 33.3399
        percentOfPlayerInGame.current = 33.3399
        percentOfTieInGame.current = 33.3399

        percentOfBankerForBar.current = 0
        percentOfPlayerForBar.current = 0
        percentOfTieForBar.current = 0
      }
    }
    else if (percentOfBankerInGame.current <= 10 || percentOfPlayerInGame.current <= 10 || percentOfTieInGame.current <= 10) {

      let numberOfPercentagesLessThanTen = 0
      let numberOfPercentagesGreaterThanTen = 0

      if (percentOfBankerInGame.current < 10) numberOfPercentagesLessThanTen++; else numberOfPercentagesGreaterThanTen++
      if (percentOfPlayerInGame.current < 10) numberOfPercentagesLessThanTen++; else numberOfPercentagesGreaterThanTen++
      if (percentOfTieInGame.current < 10) numberOfPercentagesLessThanTen++; else numberOfPercentagesGreaterThanTen++

      const differenceToRightFillingOfTheBar = numberOfPercentagesLessThanTen * (10 / numberOfPercentagesGreaterThanTen)

      if (percentOfBankerInGame.current - differenceToRightFillingOfTheBar >= percentOfBankerInGame.current) {
        percentOfBankerInGame.current = percentOfBankerInGame.current <= 10 ? 10 : percentOfBankerInGame.current - differenceToRightFillingOfTheBar
      }
      else {
        percentOfBankerInGame.current = percentOfBankerInGame.current <= 10 ? 10 : percentOfBankerInGame.current
      }

      if (percentOfPlayerInGame.current - differenceToRightFillingOfTheBar >= percentOfPlayerInGame.current) {
        percentOfPlayerInGame.current = percentOfPlayerInGame.current <= 10 ? 10 : percentOfPlayerInGame.current - differenceToRightFillingOfTheBar
      }
      else {
        percentOfPlayerInGame.current = percentOfPlayerInGame.current <= 10 ? 10 : percentOfPlayerInGame.current
      }

      if (percentOfTieInGame.current - differenceToRightFillingOfTheBar >= percentOfTieInGame.current) {
        percentOfTieInGame.current = percentOfTieInGame.current <= 10 ? 10 : percentOfTieInGame.current - differenceToRightFillingOfTheBar
      }
      else {
        percentOfTieInGame.current = percentOfTieInGame.current <= 10 ? 10 : percentOfTieInGame.current
      }
    }


    if (isFirstRender) forceUpdate()
  }

  useEffect(() => {
    updateBar(0, 0, true)
  }, [])


  return (
    <>
      <div className="h-[1080px] w-[1920px] bg-main">
        {cellsOfTopInGame.map(cel => (
          <img
            key={currentMatch.current + (Math.random() * (236 - 119) + 119)}
            src={newImage[cel.image]}
            className='absolute h-[2.5rem] w-[2.5rem]'
            style={{
              top: cel.position.y,
              left: cel.position.x,
            }}
          />))
        }

        {cellsOfBottomInGame.map(cel => (
          <img
            key={currentMatch.current + (Math.random() * (118 - 1) + 1)}
            src={newImage[cel.image]}
            className='absolute h-[2.5rem] w-[2.5rem]'
            style={{
              top: cel.position.y,
              left: cel.position.x,
            }}
          />))
        }
      </div>

      <div className="relative top-[-50.9em] left-[62.7em]">
        <div className="overflow-hidden w-[858px] h-[54px] text-3xl flex rounded-[30px] border-solid border-slate-900 border-[1px]">
          <div style={{ width: `${percentOfBankerInGame.current}%` }} className="rounded-l-[30px] redBar shadow-none flex flex-col text-center whitespace-nowrap font-bars text-[40px] text-black  justify-center">{`${Math.round(percentOfBankerForBar.current)}%`}</div>
          <div style={{ width: `${percentOfPlayerInGame.current}%` }} className="blueBar shadow-none flex flex-col text-center whitespace-nowrap font-bars text-[40px] text-black justify-center">{`${Math.round(percentOfPlayerForBar.current)}%`}</div>
          <div style={{ width: `${percentOfTieInGame.current}%` }} className="rounded-r-[30px] greenBar shadow-none flex flex-col text-center whitespace-nowrap font-bars text-[40px] text-black justify-center">{`${Math.round(percentOfTieForBar.current)}%`}</div>
        </div>
      </div>

      <button onClick={() => updateCurrentMatch(1)} className="text-white rounded-2xl text-3xl w-[120px] h-[50px] mx-2 bg-red-600 hover:bg-red-400 hover:text-black transition-colors">Banker</button>
      <button onClick={() => updateCurrentMatch(2)} className="text-white rounded-2xl text-3xl w-[120px] h-[50px] mx-2 bg-blue-600 hover:bg-blue-400 hover:text-black transition-colors">Player</button>
      <button onClick={() => updateCurrentMatch(3)} className="text-white rounded-2xl text-3xl w-[120px] h-[50px] mx-2 bg-green-500 hover:bg-green-300 hover:text-black transition-colors">Tie</button>
      <button onClick={() => updateCurrentMatch(4)} className="text-white rounded-2xl text-3xl w-[120px] h-[50px] mx-2 bg-yellow-500 hover:bg-yellow-300 hover:text-black transition-colors">Natural</button>

      <button
        onClick={() => {
          setCellsOfTopInGame([{}])
          currentMatch.current = 0
          columnOfTop.current = 0
          rowOfTop.current = 0
        }}
        className="text-white rounded-2xl text-3xl w-[120px] h-[50px] mx-8 bg-sky-600 hover:bg-red-400 hover:text-black transition-colors"
      >CLEAR
      </button>
    </>
  )
}

export default Game
