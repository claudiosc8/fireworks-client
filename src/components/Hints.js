import React from 'react';


const Hints = ({hintColor, hintValue, colors, hint}) => {

	return (

		<div id='hints' className="section border grow">
				<div className='title'>Hints</div>
				<div className='flex center'>{colors.map((color,i) => <span className={`hint symbol ${color} color${hint.value === color ? ' selected' : ''}`} key={i} onClick={() => hintColor(color)}></span>)}</div>
				<div className='flex center'>{colors.map((e,i) => <span className={`hint value${hint.value === i+1 ? ' selected' : ''}`} key={i} onClick={() => hintValue(i+1)}>{i+1}</span>)}</div>
		</div>

		)
}

export default Hints