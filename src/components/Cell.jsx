import Banker from '../../assets/red-ball.png'
import Player from '../../assets/blue-ball.png'
import Natural from '../../assets/yellow-ball.png'
import TieHands from '../../assets/green-ball.png'
import EmptyBall from '../../assets/ball-empty.png'



function Cell({ position, image }) {

  let newImage = EmptyBall

  switch (image) {
    case 0:
      newImage = EmptyBall
      break;

    case 1:
      newImage = Banker
      break;

    case 2:
      newImage = Player
      break;

    case 3:
      newImage = Natural
      break;

    case 4:
      newImage = TieHands
      break;

    default:
      newImage = EmptyBall
  }

  return (
    <img className={position} src={newImage} />
    // <div className={position}>
    // </div>
  )

}

export default Cell