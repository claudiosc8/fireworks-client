import React, {useState} from 'react';
import Fireworks from './Fireworks'
import Button from './Button'
import Star from '../img/star.svg'
import Cloud from '../img/cloud.svg'
import StarEmpty from '../img/star-empty.svg'
import { motion, AnimatePresence } from "framer-motion";

const GameOver = ({gameover, score, result, className, handleStartGame}) => {

	const [isVisible, setVisibility] = useState(true);

	const renderStars = (number) => {
	    const items = [];
	    for (let i=0; i < 5; i++) {
	    	const src = i < number ? Star : StarEmpty
	        items.push(<img src={src} alt='star' className='star'/>);
	    }
	    return items;
	}

	console.log(isVisible)

	return (


			<AnimatePresence>
			{isVisible && 
			<motion.div 
			id="gameover" 
			className={`popup-wrapper${className || ''}`} 
			initial={{ opacity: 0 }}
	        animate={{ opacity: 1 }}
	        exit={{ opacity: 0, scale: 1.01 }} 
			>
				
				 <motion.div 
					className='popup' 
					key="modal"
			        initial={{ y: 20}}
			        animate={{ y: 0 }}
		        >
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
								<div className='result'>Very good!The audience is enthusiastic!</div>
							</React.Fragment>
							)}
			 			<Button text={'New Game'} onClick={() => handleStartGame()} />
						<Button className="close-btn" onClick={() => setVisibility(false)} />
					</div>
				</motion.div>}

				{!gameover && <Fireworks id='fireworks'/>}
				
					<div 
					className={'background'} 
					onClick={() => setVisibility(false)}
					></div>
				
			</motion.div>
					    }
	        </AnimatePresence>

		)
}

export default GameOver