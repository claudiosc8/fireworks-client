import React from 'react';
import '../css/Card.css';

const Card = ({value, color, selected, unknown, onClick, style, className, children}) => {

	return (


		<div 
		className={`card${selected ? ' selected' : ''}${className || ''}`} 
		onClick={onClick} 
		data-color={unknown ? 'unknown' : color} 
		data-value={unknown ? 'unknown' : value}
		style={style}
		>
			{unknown ? '' : value}
			{children}
		</div>


		)
}

export default Card