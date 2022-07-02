import { useEffect, useReducer, useRef, useState } from 'react'
import Banker from '../assets/red-ball.png'
import Player from '../assets/blue-ball.png'
import Natural from '../assets/yellow-ball.png'
import TieHands from '../assets/green-ball.png'
import EmptyBall from '../assets/ball-empty.png'
import Bar from '../components/Bar'

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

  const VISUAL_LIMIT_OF_BAR_FILL = 20

  /// # All Bars
  const numberOfBankerInGame = useRef(0)
  const numberOfPlayerInGame = useRef(0)
  const numberOfTieInGame = useRef(0)
  const numberOfBallsInGame = useRef(0)

  /// # Main Bar
  const percentOfBankerInGame = useRef(0)
  const percentOfPlayerInGame = useRef(0)
  const percentOfTieInGame = useRef(0)

  const percentOfBankerForBar = useRef(0)
  const percentOfPlayerForBar = useRef(0)
  const percentOfTieForBar = useRef(0)

  const MODEL_OF_BARS_VARIABLES = {
    percentOfBankerInGame: 0,
    percentOfPlayerInGame: 0,
    percentOfTieInGame: 0,
    percentOfBankerForBar: 0,
    percentOfPlayerForBar: 0,
    percentOfTieForBar: 0,
  }

  const memoryForTheLastBars = useRef([MODEL_OF_BARS_VARIABLES, MODEL_OF_BARS_VARIABLES, MODEL_OF_BARS_VARIABLES, MODEL_OF_BARS_VARIABLES])

  /// # Last Bar
  const percentOfBankerInGameForLastBar = useRef(0)
  const percentOfPlayerInGameForLastBar = useRef(0)
  const percentOfTieInGameForLastBar = useRef(0)

  const percentOfBankerForBarForLastBar = useRef(0)
  const percentOfPlayerForBarForLastBar = useRef(0)
  const percentOfTieForBarForLastBar = useRef(0)

  /// # Last Bar 2 -> Penult Bar
  const percentOfBankerInGameForPenultBar = useRef(0)
  const percentOfPlayerInGameForPenultBar = useRef(0)
  const percentOfTieInGameForPenultBar = useRef(0)

  const percentOfBankerForBarForPenultBar = useRef(0)
  const percentOfPlayerForBarForPenultBar = useRef(0)
  const percentOfTieForBarForPenultBar = useRef(0)

  /// # Last Bar 3 -> Antepenult Bar
  const percentOfBankerInGameForAntepenultBar = useRef(0)
  const percentOfPlayerInGameForAntepenultBar = useRef(0)
  const percentOfTieInGameForAntepenultBar = useRef(0)

  const percentOfBankerForBarForAntepenultBar = useRef(0)
  const percentOfPlayerForBarForAntepenultBar = useRef(0)
  const percentOfTieForBarForAntepenultBar = useRef(0)

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


      if ((percentOfBankerInGame.current - (numberOfZero * (VISUAL_LIMIT_OF_BAR_FILL / nonZeroNumber))) >= percentOfBankerInGame.current) {
        percentOfBankerInGame.current = percentOfBankerInGame.current === 0 ? VISUAL_LIMIT_OF_BAR_FILL : percentOfBankerInGame.current - (numberOfZero * (VISUAL_LIMIT_OF_BAR_FILL / nonZeroNumber))
      }
      else {
        if (percentOfBankerInGame.current === 0) { percentOfBankerInGame.current = VISUAL_LIMIT_OF_BAR_FILL; canIPutZeroInPercentOfBankerForBar = true }
        else if (percentOfBankerInGame.current < VISUAL_LIMIT_OF_BAR_FILL) percentOfBankerInGame.current = VISUAL_LIMIT_OF_BAR_FILL
      }

      if ((percentOfPlayerInGame.current - (numberOfZero * (VISUAL_LIMIT_OF_BAR_FILL / nonZeroNumber))) >= percentOfPlayerInGame.current) {
        percentOfPlayerInGame.current = percentOfPlayerInGame.current === 0 ? VISUAL_LIMIT_OF_BAR_FILL : percentOfPlayerInGame.current - (numberOfZero * (VISUAL_LIMIT_OF_BAR_FILL / nonZeroNumber))
      }
      else {
        if (percentOfPlayerInGame.current === 0) { percentOfPlayerInGame.current = VISUAL_LIMIT_OF_BAR_FILL; canIPutZeroInPercentOfPlayerForBar = true }
        else if (percentOfPlayerInGame.current < VISUAL_LIMIT_OF_BAR_FILL) percentOfPlayerInGame.current = VISUAL_LIMIT_OF_BAR_FILL
      }

      if ((percentOfTieInGame.current - (numberOfZero * (VISUAL_LIMIT_OF_BAR_FILL / nonZeroNumber))) >= percentOfTieInGame.current) {
        percentOfTieInGame.current = percentOfTieInGame.current === 0 ? VISUAL_LIMIT_OF_BAR_FILL : percentOfTieInGame.current - (numberOfZero * (VISUAL_LIMIT_OF_BAR_FILL / nonZeroNumber))
      }
      else {
        if (percentOfTieInGame.current === 0) { percentOfTieInGame.current = VISUAL_LIMIT_OF_BAR_FILL; canIPutZeroInPercentOfTieForBar = true }
        else if (percentOfTieInGame.current < VISUAL_LIMIT_OF_BAR_FILL) percentOfTieInGame.current = VISUAL_LIMIT_OF_BAR_FILL
      }

      if (percentOfBankerInGame.current === VISUAL_LIMIT_OF_BAR_FILL && canIPutZeroInPercentOfBankerForBar) percentOfBankerForBar.current = 0
      if (percentOfPlayerInGame.current === VISUAL_LIMIT_OF_BAR_FILL && canIPutZeroInPercentOfPlayerForBar) percentOfPlayerForBar.current = 0
      if (percentOfTieInGame.current === VISUAL_LIMIT_OF_BAR_FILL && canIPutZeroInPercentOfTieForBar) percentOfTieForBar.current = 0

      if (numberOfZero === 3) {
        percentOfBankerInGame.current = 33.3399
        percentOfPlayerInGame.current = 33.3399
        percentOfTieInGame.current = 33.3399

        percentOfBankerForBar.current = 0
        percentOfPlayerForBar.current = 0
        percentOfTieForBar.current = 0
      }
    }
    else if (percentOfBankerInGame.current <= VISUAL_LIMIT_OF_BAR_FILL || percentOfPlayerInGame.current <= VISUAL_LIMIT_OF_BAR_FILL || percentOfTieInGame.current <= VISUAL_LIMIT_OF_BAR_FILL) {

      let numberOfPercentagesLessThanTen = 0
      let numberOfPercentagesGreaterThanTen = 0

      if (percentOfBankerInGame.current < VISUAL_LIMIT_OF_BAR_FILL) numberOfPercentagesLessThanTen++; else numberOfPercentagesGreaterThanTen++
      if (percentOfPlayerInGame.current < VISUAL_LIMIT_OF_BAR_FILL) numberOfPercentagesLessThanTen++; else numberOfPercentagesGreaterThanTen++
      if (percentOfTieInGame.current < VISUAL_LIMIT_OF_BAR_FILL) numberOfPercentagesLessThanTen++; else numberOfPercentagesGreaterThanTen++

      const differenceToRightFillingOfTheBar = numberOfPercentagesLessThanTen * (VISUAL_LIMIT_OF_BAR_FILL / numberOfPercentagesGreaterThanTen)

      if (percentOfBankerInGame.current - differenceToRightFillingOfTheBar >= percentOfBankerInGame.current) {
        percentOfBankerInGame.current = percentOfBankerInGame.current <= VISUAL_LIMIT_OF_BAR_FILL ? VISUAL_LIMIT_OF_BAR_FILL : percentOfBankerInGame.current - differenceToRightFillingOfTheBar
      }
      else {
        percentOfBankerInGame.current = percentOfBankerInGame.current <= VISUAL_LIMIT_OF_BAR_FILL ? VISUAL_LIMIT_OF_BAR_FILL : percentOfBankerInGame.current
      }

      if (percentOfPlayerInGame.current - differenceToRightFillingOfTheBar >= percentOfPlayerInGame.current) {
        percentOfPlayerInGame.current = percentOfPlayerInGame.current <= VISUAL_LIMIT_OF_BAR_FILL ? VISUAL_LIMIT_OF_BAR_FILL : percentOfPlayerInGame.current - differenceToRightFillingOfTheBar
      }
      else {
        percentOfPlayerInGame.current = percentOfPlayerInGame.current <= VISUAL_LIMIT_OF_BAR_FILL ? VISUAL_LIMIT_OF_BAR_FILL : percentOfPlayerInGame.current
      }

      if (percentOfTieInGame.current - differenceToRightFillingOfTheBar >= percentOfTieInGame.current) {
        percentOfTieInGame.current = percentOfTieInGame.current <= VISUAL_LIMIT_OF_BAR_FILL ? VISUAL_LIMIT_OF_BAR_FILL : percentOfTieInGame.current - differenceToRightFillingOfTheBar
      }
      else {
        percentOfTieInGame.current = percentOfTieInGame.current <= VISUAL_LIMIT_OF_BAR_FILL ? VISUAL_LIMIT_OF_BAR_FILL : percentOfTieInGame.current
      }
    }

    saveOldResultsToBars(percentOfBankerInGame.current, percentOfPlayerInGame.current, percentOfTieInGame.current, percentOfBankerForBar.current, percentOfPlayerForBar.current, percentOfTieForBar.current)

    /// ## To the Other Bars
    if (currentMatch.current > 0) {

      /// ### Last Bar
      percentOfBankerInGameForLastBar.current = memoryForTheLastBars.current[1].percentOfBankerInGame
      percentOfPlayerInGameForLastBar.current = memoryForTheLastBars.current[1].percentOfPlayerInGame
      percentOfTieInGameForLastBar.current = memoryForTheLastBars.current[1].percentOfTieInGame

      percentOfBankerForBarForLastBar.current = memoryForTheLastBars.current[1].percentOfBankerInGame
      percentOfPlayerForBarForLastBar.current = memoryForTheLastBars.current[1].percentOfPlayerInGame
      percentOfTieForBarForLastBar.current = memoryForTheLastBars.current[1].percentOfTieInGame

      /// ### Penult Bar
      percentOfBankerInGameForPenultBar.current = memoryForTheLastBars.current[2].percentOfBankerInGame
      percentOfPlayerInGameForPenultBar.current = memoryForTheLastBars.current[2].percentOfPlayerInGame
      percentOfTieInGameForPenultBar.current = memoryForTheLastBars.current[2].percentOfTieInGame

      percentOfBankerForBarForPenultBar.current = memoryForTheLastBars.current[2].percentOfBankerInGame
      percentOfPlayerForBarForPenultBar.current = memoryForTheLastBars.current[2].percentOfPlayerInGame
      percentOfTieForBarForPenultBar.current = memoryForTheLastBars.current[2].percentOfTieInGame

      /// ### Antepenult Bar
      percentOfBankerInGameForAntepenultBar.current = memoryForTheLastBars.current[3].percentOfBankerInGame
      percentOfPlayerInGameForAntepenultBar.current = memoryForTheLastBars.current[3].percentOfPlayerInGame
      percentOfTieInGameForAntepenultBar.current = memoryForTheLastBars.current[3].percentOfTieInGame

      percentOfBankerForBarForAntepenultBar.current = memoryForTheLastBars.current[3].percentOfBankerInGame
      percentOfPlayerForBarForAntepenultBar.current = memoryForTheLastBars.current[3].percentOfPlayerInGame
      percentOfTieForBarForAntepenultBar.current = memoryForTheLastBars.current[3].percentOfTieInGame
    }


    if (isFirstRender) forceUpdate()
  }

  const saveOldResultsToBars = (percentOfBankerInGame, percentOfPlayerInGame, percentOfTieInGame, percentOfBankerForBar, percentOfPlayerForBar, percentOfTieForBar) => {

    const newSave = {
      percentOfBankerInGame: percentOfBankerInGame,
      percentOfPlayerInGame: percentOfPlayerInGame,
      percentOfTieInGame: percentOfTieInGame,
      percentOfBankerForBar: percentOfBankerForBar,
      percentOfPlayerForBar: percentOfPlayerForBar,
      percentOfTieForBar: percentOfTieForBar
    }

    memoryForTheLastBars.current.pop()
    memoryForTheLastBars.current.unshift(newSave)
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

      <Bar
        xPosition={62.7}
        yPosition={-50.9}
        width={53.625}
        height={3.375}
        font={'font-bars'}
        fontSize={3}
        percentOfBankerInGame={percentOfBankerInGame.current}
        percentOfPlayerInGame={percentOfPlayerInGame.current}
        percentOfTieInGame={percentOfTieInGame.current}
        percentOfBankerForBar={percentOfBankerForBar.current}
        percentOfPlayerForBar={percentOfPlayerForBar.current}
        percentOfTieForBar={percentOfTieForBar.current} />

      <Bar
        xPosition={34.1}
        yPosition={-18.8}
        width={38.7}
        height={2.7}
        font={'font-bars'}
        fontSize={2}
        percentOfBankerInGame={percentOfBankerInGameForLastBar.current}
        percentOfPlayerInGame={percentOfPlayerInGameForLastBar.current}
        percentOfTieInGame={percentOfTieInGameForLastBar.current}
        percentOfBankerForBar={percentOfBankerForBarForLastBar.current}
        percentOfPlayerForBar={percentOfPlayerForBarForLastBar.current}
        percentOfTieForBar={percentOfTieForBarForLastBar.current} />

      <Bar
        xPosition={34.1}
        yPosition={-15.6}
        width={38.7}
        height={2.7}
        font={'font-bars'}
        fontSize={2}
        percentOfBankerInGame={percentOfBankerInGameForPenultBar.current}
        percentOfPlayerInGame={percentOfPlayerInGameForPenultBar.current}
        percentOfTieInGame={percentOfTieInGameForPenultBar.current}
        percentOfBankerForBar={percentOfBankerForBarForPenultBar.current}
        percentOfPlayerForBar={percentOfPlayerForBarForPenultBar.current}
        percentOfTieForBar={percentOfTieForBarForPenultBar.current} />

      <Bar
        xPosition={34.1}
        yPosition={-12.8}
        width={38.7}
        height={2.7}
        font={'font-bars'}
        fontSize={2}
        percentOfBankerInGame={percentOfBankerInGameForAntepenultBar.current}
        percentOfPlayerInGame={percentOfPlayerInGameForAntepenultBar.current}
        percentOfTieInGame={percentOfTieInGameForAntepenultBar.current}
        percentOfBankerForBar={percentOfBankerForBarForAntepenultBar.current}
        percentOfPlayerForBar={percentOfPlayerForBarForAntepenultBar.current}
        percentOfTieForBar={percentOfTieForBarForAntepenultBar.current} />


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
