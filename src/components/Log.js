import React, {useRef, useEffect} from 'react';
import * as moment from 'moment';
import parse from 'html-react-parser';
import ScrollToBottom from 'react-scroll-to-bottom';
import Logo from '../img/logo.svg'
import Button from './Button'

const Log = ({messages, className, showLog, setShowLog, handleStartGame}) => {


	const innerRef = useOuterClick(() => close(), showLog);

	const close = () => {
		setShowLog(false)
	}

	return (

		<div id="log" className={`section${className || ''}${showLog ? ' show' : ''}`} ref={innerRef}>
			
				<img src={Logo} alt='logo' className='logo'/>
			

			<ScrollToBottom className='log'>
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

			<Button text='New game' onClick={handleStartGame} />
			
			<a href={'/fireworks/'}>
				<Button text='Leave Room' />
			</a>
		</div>


		)
}


function useOuterClick(callback, active) {
  const innerRef = useRef();
  const callbackRef = useRef();
  const activeRef = useRef();

  useEffect(() => { 
    callbackRef.current = callback;
    activeRef.current = active;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    function handleClick(e) {
      if (
        innerRef.current && 
        callbackRef.current &&
        activeRef.current &&
        !innerRef.current.contains(e.target)
      ) {
        callbackRef.current(e);
      }
    }
  }, []); 
  
  return innerRef;
}


export default Log