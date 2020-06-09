import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Card from './Card'

const Hand = ({currentTurn, className, cards, handlePlayHint, handleSelect, handlePlayCard, player, selected, lastcard, index, deselect, playable, online}) => {


	const currentPlayer = index === 0;

	const [isDragging, setDragging] = useState(false);





	function isEventInElement(event, element)   {
	    var rect = element.getBoundingClientRect();
	    var x = event.clientX;
	    if (x < rect.left || x >= rect.right) return false;
	    var y = event.clientY;
	    if (y < rect.top || y >= rect.bottom) return false;
	    return true;
	}

	const onDragStart = (event, info, i) => {
		setDragging(i);
		deselect()
		const table = document.getElementById('table')
		const discard = document.getElementById('discard')

		if(table && discard) {
			table.classList.add("selectable");
			discard.classList.add("selectable");
		}
		console.log(event)
		
	}

	const onDrag = (event, info) => {
		
		const table = document.getElementById('table')
		const discard = document.getElementById('discard')

		if(table && discard) {

			if (isEventInElement(event, table)) {
				table.classList.add("droppable");
				discard.classList.remove("droppable");
			} else if (isEventInElement(event, discard)) {
				discard.classList.add("droppable");
				table.classList.remove("droppable");
			} else {
				table.classList.remove("droppable");
				discard.classList.remove("droppable");
			}

		}
	
	}

	const onDragEnd = (event, info, index) => {

		const table = document.getElementById('table')
		const discard = document.getElementById('discard')

		if(table && discard) {

			if (isEventInElement(event, table)) {
				handlePlayCard('play', index)
			} else if (isEventInElement(event, discard)) {
				handlePlayCard('discard', index)
			}

			table.classList.remove("droppable", "selectable");
			discard.classList.remove("droppable", "selectable");

		}

		setTimeout(() => { setDragging(false) }, 200);
	}



	return (

			
			<div className={`hand section border player${index}${className}${currentTurn ? ' currentTurn' : ''}`} onClick={() => handlePlayHint()} style={{zIndex: isDragging !== false ? 1 : 0}}>

			<div className='player-info'>{player.name} {!online && <div className='status'>offline</div>} </div>
			<div className={'cards-wrapper'}>
				{cards.map((card,i) => {
						
					const isSelected = currentPlayer && Number(selected) === Number(i);


					return card !== null ? 
								<motion.div 
									key={card.id} 
									positionTransition={{transition:1}} 
									dragConstraints={{ left:0, right:0, top:0, bottom:0 }}
									animate={{ scale: 1, transition: .2 }} 
									whileHover={playable && { scale: 1.03, transition: .2 }}
									initial={{ scale:0 }} 
									drag={playable}
									onDragStart={(event, info) => onDragStart(event, info, i)}
								  	onDrag={(event, info) => onDrag(event, info)}
								  	onDragEnd={(event, info) => onDragEnd(event, info, i)}
								  	dragElastic={1}
								  	style={{zIndex: isDragging === i ? 5 : 0}}
								  	className={`card-wrapper${isDragging === i ? ' dragging' : ''}${isSelected ? ' selected' : ''}`}
								>
								 <Card 
									id={card.id}
									card={card} 
									unknown={currentPlayer} 
									selected={currentPlayer && Number(selected) === Number(i)}
									onClick={() => isDragging === false && handleSelect(i) }
									newCard={lastcard && card.id === lastcard.id}
									dragging={isDragging === i}
								/>
								</motion.div> : null
					}

				)}
			</div>
			</div>

	)

}

export default Hand