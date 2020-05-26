import React from 'react';
import * as moment from 'moment';
import parse from 'html-react-parser';
import ScrollToBottom from 'react-scroll-to-bottom';

const Log = ({messages, className}) => {



	return (


		<div id="log" className={`section${className || ''}`} >
			<div className='title'>Game Log</div>
			<ScrollToBottom>
			<div className='relative'>

			
						
				
				<ul> 
					{messages && messages.map((message,i) =>  {
						return <li key={i}>
						<div className='time'>{moment(message.time).format('LT')} </div>
						<div className='message'>{parse(message.value)}</div>
						</li>
					})}
				</ul>
				
			</div>
	
			</ScrollToBottom> 
		</div>


		)
}

export default Log