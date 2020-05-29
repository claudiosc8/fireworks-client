import React from 'react';


const Card = ({card, id, selected, unknown, onClick, style, className, children, newCard, dragging}) => {

	return (


			<span 	
				className={`card${className || ''}${newCard ? ' newCard' : ''}`} 
				onClick={onClick} 
				data-color={unknown ? 'unknown' : card.color} 
				data-value={unknown ? 'unknown' : card.value}
				style={style}
				id={id}
			>

					{card.hintColor && <div className={`hint color ${card.color}`} ></div>}
					{card.hintValue && <div className={`hint value`}>{card.value}</div>}
					{unknown ? '' : card.value}
					{children}

				</span>
				


		)
}

export default Card