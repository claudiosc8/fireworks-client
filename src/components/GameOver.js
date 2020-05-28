import React from 'react';
import Fireworks from './Fireworks'
import Button from './Button'
import Star from '../img/star.svg'
import Cloud from '../img/cloud.svg'
import StarEmpty from '../img/star-empty.svg'

const GameOver = ({gameover, score, result, className}) => {

	const renderStars = (number) => {
	    const items = [];
	    for (let i=0; i < 5; i++) {
	    	const src = i < number ? Star : StarEmpty
	        items.push(<img src={src} alt='star' className='star'/>);
	    }
	    return items;
	}

	return (

		<React.Fragment>

		<div id="gameover" className={`popup-wrapper${className || ''}`} >
			<div className='popup'>
				<div className='relative popup-inner'>
					{gameover ? (
						<React.Fragment>
							<img src={Cloud} alt='gameover' className='cloud'/>
							<div className='gameover'>Game Over</div>
							<div className='result'>The third storm token has been played.</div>
						</React.Fragment>
						) : (
						<React.Fragment>
							<div className="score">your score:20</div>
							<div className='stars'>{renderStars(4)}</div>
							<div className='result'>Very good! The audience is enthusiastic!</div>
						</React.Fragment>
						)}
		 			<Button text={'New Game'} />
					<Button className="close-btn" />
				</div>
			</div>
			{!gameover && <Fireworks id='fireworks'/>}
			<div className={'background'}></div>
		</div>
		
		</React.Fragment>

		)
}

export default GameOver