import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useAnimation } from "framer-motion";
import Card from './Card'

const Hand = ({currentTurn, className, cards, handlePlayHint, handleSelect, player, selected, lastcard}) => {

	const currentPlayer = player === 0;

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

			<React.Fragment>
			
			<div className={`hand player${player}${className}${currentTurn ? ' currentTurn' : ''}`} onClick={() => handlePlayHint()}>

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

				)
			}</div>
			</React.Fragment>

	)

}

export default Hand