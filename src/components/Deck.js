import React from 'react';
import Card from './Card'
import Empty from './Empty'


const Deck = ({number, id, unknown, onClick, distance, className}) => {

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

		<div id={id} className={`deck${className || ''}`} onClick={onClick}>
		
		<div className='relative'>
			
			{number > 0 ? renderCards(number) : <Empty />}
		</div>

		</div>

		)
}

export default Deck