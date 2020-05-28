import React from 'react';
import Card from './Card'
import Empty from './Empty'


const Deck = ({id, unknown, onClick, distance, className, cards, title}) => {

	const renderCards = (number) => {
	    const items = [];
	    for (let i=0; i < number; i++) {
	    	const style = {top:-i*distance}


	        items.push(<Card 
	        	unknown={unknown} 
	        	style={style} 
	        	className={`${i === 0 ? '' : ' absolute'}` } 
	        	key={i}
	        	card={cards[i]}
	        	>
	        	{i === number-1 && unknown && <div className="number">{number}</div>}
	        	</Card>
	        	);
	    }
	    return items;
	}

	return (

		<div id={id} className={`deck${className || ''}`} onClick={onClick}>
		{title && <div className='title'>{title}</div>}
		<div className='relative'>
			
			{cards.length > 0 ? renderCards(cards.length) : <Empty />}
		</div>

		</div>

		)
}

export default Deck