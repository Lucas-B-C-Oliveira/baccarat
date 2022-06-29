function Control(props) {

  return (
    <>
      <button onClick={() => props.updateCurrentMatch(1)} className="text-white rounded-2xl text-3xl w-[120px] h-[50px] mx-2 bg-red-600 hover:bg-red-400 hover:text-black transition-colors">Banker</button>
      <button onClick={() => props.updateCurrentMatch(2)} className="text-white rounded-2xl text-3xl w-[120px] h-[50px] mx-2 bg-blue-600 hover:bg-blue-400 hover:text-black transition-colors">Player</button>
      <button onClick={() => props.updateCurrentMatch(3)} className="text-white rounded-2xl text-3xl w-[120px] h-[50px] mx-2 bg-green-500 hover:bg-green-300 hover:text-black transition-colors">Tie</button>
      <button onClick={() => props.updateCurrentMatch(4)} className="text-white rounded-2xl text-3xl w-[120px] h-[50px] mx-2 bg-yellow-500 hover:bg-yellow-300 hover:text-black transition-colors">Natural</button>
    </>
  )

}

export default Control