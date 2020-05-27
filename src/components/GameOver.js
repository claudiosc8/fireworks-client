import React, {useEffect} from 'react';
import Fireworks from './Fireworks'
import Button from './Button'
import Star from '../img/star.svg'
import StarEmpty from '../img/star-empty.svg'

const GameOver = ({stormTokens, score, result, className}) => {

	const renderStars = (number) => {
	    const items = [];
	    for (let i=0; i < 5; i++) {
	    	const src = i < number ? Star : StarEmpty
	        items.push(<img src={src} alt='star' />);
	    }
	    return items;
	}

	return (

		<React.Fragment>

		<div id="gameover" className={`popup-wrapper${className || ''}`} >
			<div className='popup'>
				<div className='relative popup-inner'>
					<div className="score">your score: 20</div>
					<div className='stars'>{renderStars(4)}</div>
					<div className='result'>Very good! The audience is enthusiastic!</div>
		 			<Button text={'New Game'} />
					<Button className="close-btn" />
				</div>
			</div>
			<Fireworks id='fireworks'/>
			<div className={'background'}></div>
		</div>
		
		</React.Fragment>

		)
}

export default GameOver