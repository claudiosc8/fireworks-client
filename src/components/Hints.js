import React, {useState} from 'react';
import '../css/Hints.css';

const Hints = ({hintColor, hintValue, colors, hint}) => {

	return (

		<div id='hints'>
				<div className='row'>{colors.map((color,i) => <span className={`hint color${hint.value === color ? ' selected' : ''}`} data-color={color} key={i} onClick={() => hintColor(color)}></span>)}</div>
				<div className='row'>{colors.map((e,i) => <span className={`hint value${hint.value === i ? ' selected' : ''}`} key={i} onClick={() => hintValue(i+1)}>{i+1}</span>)}</div>
		</div>

		)
}

export default Hints