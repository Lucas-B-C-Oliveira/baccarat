import Cell from './Cell'
// import Player from '../../assets/yellow-ball.png' //! For Teste - Delete this
// import Player1 from '../../assets/blue-ball.png' //! For Teste - Delete this
// import Player2 from '../../assets/red-ball.png' //! For Teste - Delete this
// import Player3 from '../../assets/green-ball.png' //! For Teste - Delete this


function Game({ cellsOfUpInGame }) {

  // console.log(cellsOfUpInGame)

  const renderCells = ({ key, position, image }) => {

    const response = <Cell key={key} position={position} image={image} />
    // console.log('-------------------')
    // console.log(response)
    return (
      response
    )
  }

  return (

    <div className="h-[1080px] w-[1920px] bg-main">
      {/* <div className="min-h-screen min-w-screen bg-main bg-size-cover bg-left-top"> */}

      {/* <img src={Player2} className="absolute top-[1.9rem] left-[24.95rem] h-[2.5rem] w-[2.5rem]"></img> */}
      {/* <img src={Player2} className="absolute top-[11.6rem] left-[2.2rem] h-[2.5rem] w-[2.5rem]"></img> */}
      {cellsOfUpInGame.map(renderCells)}

    </div>

  )
}


export default Game