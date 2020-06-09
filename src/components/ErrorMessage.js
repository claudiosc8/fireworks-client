import React from 'react';
import Button from './Button'
import {Link} from 'react-router-dom'

const ErrorMessage = ({message}) => {


	return (

		<div id='error'>
				<div className='text'>{message}</div>
				<Link to={'/'}><Button text={'Go back'} /></Link>
		</div>

		)
}

export default ErrorMessage