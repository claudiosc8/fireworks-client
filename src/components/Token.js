import React from 'react';

const Token = ({name, number, id, distance, className}) => {

	const renderTokens = (number) => {
	    const items = [];
	    for (let i=0; i < number; i++) {
	    	const rotate = i === number-1 ? 0 : i*distance*2
	    	const style = {top:-i*distance, position: i === 0 ? 'relative' : 'absolute', transform: "rotate("+rotate+"deg)"}
	        items.push(<div key={i} className='token' style={style}>{i === number-1 && number} </div>);
	    }
	    return items;
	}

	return (

		<div id={id} className={`tokens${className}`} data-tip={name}>
		
		<div className='relative'>
			{renderTokens(number)}
		</div>

		</div>

		)
}

export default Token