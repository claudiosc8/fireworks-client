import React from 'react';


const Empty = ({id, className}) => {


	return (

			<div className='empty-wrapper' id={id}>
				<span 	
				className={`empty${className || ''}`} 
				>
					
				</span>
			</div>

		)
}

export default Empty