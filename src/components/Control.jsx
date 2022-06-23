

function Control(props) {

  const updateCurrentMatchToBanker = () => {
    props.updateCurrentMatch(1)
  }

  const updateCurrentMatchToPlayer = () => {
    props.updateCurrentMatch(2)
  }

  const updateCurrentMatchToNatural = () => {
    props.updateCurrentMatch(3)
  }

  const updateCurrentMatchToTieHands = () => {
    props.updateCurrentMatch(4)
  }



  return (
    <>
      <button onClick={updateCurrentMatchToBanker} type="button" className="tw-btn-red">Banker</button>
      <button onClick={updateCurrentMatchToPlayer} type="button" className="tw-btn-blue">Player</button>
      <button onClick={updateCurrentMatchToNatural} type="button" className="btn btn-warning">Natural</button>
      <button onClick={updateCurrentMatchToTieHands} type="button" className="btn btn-success">Tie Hands</button>
    </>
  )

}

export default Control