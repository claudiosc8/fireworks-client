import React from 'react';


const Card = ({card, id, selected, unknown, onClick, style, className, children, newCard, dragging}) => {

	return (

			<div className={`card-wrapper${selected ? ' selected' : ''}${dragging ? ' dragging' : ''}`} id={id}>
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