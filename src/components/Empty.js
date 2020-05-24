import React from 'react';


const Empty = ({id, className}) => {


	// useEffect( () => {
	// 	if(newCard) {
	// 		const deck = document.getElementById('remainingCards');
	// 		const card = document.getElementById(id);
	// 		const deckBounds = deck.getBoundingClientRect();
	// 		const cardBounds = card.getBoundingClientRect();
	// 		const d = {y: deckBounds.top-cardBounds.top, x:deckBounds.left-cardBounds.left}
	// 		TweenMax.from('#'+id, 2, {yPercent:d.y, yPercent:d.x});
	// 	}
	// }, [newCard])


	return (

			<div className='empty-wrapper' id={id}>
				<span 	
				className={`empty${className || ''}`} 
				>
					
				</span>
			</div>

		)
}

export default Empty