import React, {useEffect, useState, useRef} from 'react';
import { TweenMax } from "gsap/all";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
// import '../css/Card.scss';

const Card = ({value, color, id, selected, unknown, onClick, style, className, children, newCard}) => {

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

			<div className='card-wrapper' id={id}>
			<span 	
			className={`card${selected ? ' selected' : ''}${className || ''}${newCard ? ' newCard' : ''}`} 
			onClick={onClick} 
			data-color={unknown ? 'unknown' : color} 
			data-value={unknown ? 'unknown' : value}
			style={style}
			>
				{unknown ? '' : value}
				{children}
			</span>
			</div>

		)
}

export default Card