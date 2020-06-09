import React, {useState} from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Button from './Button'

const Popup = ({id, className, background, children}) => {

	const [isVisible, setVisibility] = useState(true);


	return (


			<AnimatePresence>
			{isVisible && 
			<motion.div 
				id={id} 
				className={`popup-wrapper${className || ''}`} 
				initial={{ opacity: 0 }}
		        animate={{ opacity: 1 }}
		        exit={{ opacity: 0, scale: 1.01 }} 
			>
				
				 <motion.div 
					className='popup' 
					key="modal"
			        initial={{ y: 20}}
			        animate={{ y: 0 }}
		        >
					<div className='relative popup-inner'>
						{children}
						<Button className="close-btn" onClick={() => setVisibility(false)} />
					</div>
				</motion.div>

					{background}

					<div 
						className={'background'} 
						onClick={() => setVisibility(false)}
					></div>
				
			</motion.div>
		    }
	        </AnimatePresence>

		)
}

export default Popup