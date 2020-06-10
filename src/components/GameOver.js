import React from 'react';
import Button from './Button'
import Star from '../img/star.svg'
import Cloud from '../img/cloud.svg'
import StarEmpty from '../img/star-empty.svg'


const GameOver = ({gameover, score, result, className, handleStartGame}) => {

	const renderStars = (number) => {
	    const items = [];
	    for (let i=0; i < 5; i++) {
	    	const src = i < number ? Star : StarEmpty
	        items.push(<img src={src} alt='star' className='star' key={i}/>);
	    }
	    return items;
	}


	return (

			<React.Fragment>
			
						{gameover ? (
							<React.Fragment>
								<img src={Cloud} alt='gameover' className='cloud'/>
								<div className='gameover'>Game Over</div>
								<div className='result'>The third storm token has been played.</div>
							</React.Fragment>
							) : (
							<React.Fragment>
								<div className="score">your score:{score}</div>
								<div className='stars'>{renderStars(Math.floor(score/5))}</div>
								<div className='result'>{result}</div>
							</React.Fragment>
							)}
			 			<Button text={'New Game'} onClick={handleStartGame} />
			
	        </React.Fragment>
		)
}

export default GameOver