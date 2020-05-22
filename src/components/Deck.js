import React from 'react';
import Card from './Card'
import '../css/Deck.css';

const Deck = ({number, id, unknown, onClick, distance}) => {

	const renderCards = (number) => {
	    const items = [];
	    for (let i=0; i < number; i++) {
	    	const style = {top:-i*distance}
	        items.push(<Card 
	        	unknown={unknown} 
	        	style={style} 
	        	className={`${i === 0 ? '' : ' absolute'}` } 
	        	key={i}>
	        	{i === number-1 && <div className="number">{number}</div>}
	        	</Card>
	        	);
	    }
	    return items;
	}

	return (

		<div id={id} className={`deck`} onClick={onClick}>
		
		<div className='relative'>
			
			
			
			{renderCards(number)}
		</div>

		</div>

		)
}

export default Deck