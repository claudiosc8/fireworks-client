import React, {useEffect, useState, useRef} from 'react';
import { TweenMax } from "gsap/all";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
// import '../css/Card.scss';

const Card = ({card, id, selected, unknown, onClick, style, className, children, newCard}) => {

	const [show, setShow] = useState(false)
	const cardRef = useRef(null)

	useEffect( () => {
		setShow(true)

	}, [])

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

			<div className={`card-wrapper${selected ? ' selected' : ''}`} id={id}>
				{(card || unknown) && <span 	
				className={`card${className || ''}${newCard ? ' newCard' : ''}`} 
				onClick={onClick} 
				data-color={unknown ? 'unknown' : card.color} 
				data-value={unknown ? 'unknown' : card.value}
				style={style}
			>

					{card.hintColor && <div className={`hint color ${card.color}`} ></div>}
					{card.hintValue && <div className={`hint value`}>{card.value}</div>}
					{unknown ? '' : card.value}
					{children}

				</span>
				}
			</div>

		)
}

export default Card