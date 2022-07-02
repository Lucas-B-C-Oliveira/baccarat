
function Bar({ xPosition, yPosition, width, height, font, fontSize, percentOfBankerInGame, percentOfPlayerInGame, percentOfTieInGame, percentOfBankerForBar, percentOfPlayerForBar, percentOfTieForBar }) {

  return (
    <>
      <div style={{ top: `${yPosition}em`, left: `${xPosition}em` }} className="relative">
        <div style={{ width: `${width}em`, height: `${height}em` }} className="overflow-hidden flex rounded-[30px] border-solid border-slate-900 border-[1px]">
          <div style={{ width: `${percentOfBankerInGame}%`, fontSize: `${fontSize}em` }} className={`rounded-l-[30px] redBar shadow-none flex text-xl flex-col text-center whitespace-nowrap ${font} text-black  justify-center`}>{`${Math.round(percentOfBankerForBar)}%`}</div>
          <div style={{ width: `${percentOfPlayerInGame}%`, fontSize: `${fontSize}em` }} className={`blueBar shadow-none flex flex-col text-center whitespace-nowrap ${font} text-black justify-center`}>{`${Math.round(percentOfPlayerForBar)}%`}</div>
          <div style={{ width: `${percentOfTieInGame}%`, fontSize: `${fontSize}em` }} className={`rounded-r-[30px] greenBar shadow-none flex flex-col text-center whitespace-nowrap ${font} text-black justify-center`}>{`${Math.round(percentOfTieForBar)}%`}</div>
        </div>
      </div>
    </>
  )
}

export default Bar