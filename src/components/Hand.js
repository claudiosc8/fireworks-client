import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useAnimation } from "framer-motion";
import Card from './Card'

const Hand = ({currentTurn, className, cards, handlePlayHint, handleSelect, player, selected, lastcard, index}) => {

	const currentPlayer = index === 0;

	const controls = useAnimation()

	const [isDragging, setDragging] = useState(false);

	const dragOriginY = useMotionValue(0);
	const dragOriginX = useMotionValue(0);

	const spring = {
	  type: "spring",
	  damping: 10,
	  stiffness: 100
	}

	return (

			
			<div className={`hand section player${index}${className}${currentTurn ? ' currentTurn' : ''}`} onClick={() => handlePlayHint()}>

			<div className='player-info'>{player.name}</div>
			<div className={'cards-wrapper'}>
				{cards.map((card,i) => {
					
					return (
		
						<Card 
							key={i}
							id={card.id}
							value={card.value} 
							color={card.color} 
							unknown={currentPlayer} 
							selected={currentPlayer && selected === i}
							onClick={() => handleSelect(i)}
							newCard={lastcard && card.id === lastcard.id}
						/>

					)}

				)}
			</div>
			</div>

	)

}

export default Hand