import React from 'react';
import Card from './Card'

const Token = ({name, number, id, distance, className}) => {

	const renderTokens = (number) => {
	    const items = [];
	    for (let i=0; i < number; i++) {
	    	const style = {top:-i*distance, position: i === 0 ? 'relative' : 'absolute'}
	        items.push(<div key={i} className='token' style={style}>{i === number-1 && number} </div>);
	    }
	    return items;
	}

	return (

		<div id={id} className={`tokens${className}`} >
		
		<div className='relative'>

			{renderTokens(number)}
		</div>

		</div>

		)
}

export default Token