import React from 'react';
import Card from './Card'
import Empty from './Empty'
import { motion } from "framer-motion";

const CardPile = ({id, unknown, onClick, distance, className, cards, title, name}) => {

	const renderCards = (number) => {
	    const items = [];
	    for (let i=0; i < number; i++) {
	    	const style = {top:-i*distance, zIndex:2}

	        items.push(
	        	<motion.div 
		        	style={style} 
		        	className={`card-wrapper${i === 0 ? '' : ' absolute'}` } 
		        	key={i}
		        	animate={{ scale: 1, transition: .2 }} 
					initial={!unknown && { scale:3 }} 
	        	>
		        	<Card 
			        	unknown={unknown} 
			        	card={cards[i]}
		        	>
		        	{i === number-1 && unknown && <div className="number">{number}</div>}
		        	</Card>
	        	</motion.div>
	        	);
	    }
	    return items;
	}

	return (

		<div id={id} className={`deck${className || ''}`} onClick={onClick} data-tip={name || undefined }>
		{title && <div className='title'>{title}</div>}
		<div className='card-pile relative flex center'>
			
			{cards.length > 0 ? renderCards(cards.length) : <div className={`empty-wrapper`}><Empty /></div>}
		</div>

		</div>

		)
}

export default CardPile