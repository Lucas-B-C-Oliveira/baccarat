import Banker from '../assets/red-ball.png'
import Player from '../assets/blue-ball.png'
import Natural from '../assets/yellow-ball.png'
import TieHands from '../assets/green-ball.png'
import EmptyBall from '../assets/ball-empty.png'



function Cell({ position, image = 0 }) {

  const newImage = {
    0: EmptyBall,
    1: Banker,
    2: Player,
    3: Natural,
    4: TieHands
  }


  return (
    <img
      src={newImage[image]}
      className='absolute h-[2.5rem] w-[2.5rem]'
      style={{
        top: position.y,
        left: position.x,
      }} />
  )

}

export default Cell