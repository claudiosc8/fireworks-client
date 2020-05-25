import React, {useState} from 'react';


const Hints = ({hintColor, hintValue, colors, hint}) => {

	return (

		<div id='hints' className="section grow">
				<div className='title'>Hints</div>
				<div className='row center'>{colors.map((color,i) => <span className={`hint symbol ${color} color${hint.value === color ? ' selected' : ''}`} key={i} onClick={() => hintColor(color)}></span>)}</div>
				<div className='row center'>{colors.map((e,i) => <span className={`hint value${hint.value === i ? ' selected' : ''}`} key={i} onClick={() => hintValue(i+1)}>{i+1}</span>)}</div>
		</div>

		)
}

export default Hints