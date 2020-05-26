import React, {useEffect} from 'react';
import Fireworks from './Fireworks'

const GameOver = ({stormTokens, score, result, className}) => {

	
	return (

		<React.Fragment>

		<div id="gameover" className={`popup-wrapper${className || ''}`} >
			<div className='popup'>

			{stormTokens > 0 ? <div className="score">{score}</div> : <div className=''>Game Over</div>}
			{stormTokens > 0 && <div className='result'>{result}</div>}
 
			</div>
			<Fireworks id='fireworks'/>
			<div className={'background'}></div>
		</div>
		
		</React.Fragment>

		)
}

export default GameOver