import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useParams, Redirect } from 'react-router-dom'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Lobby from './Lobby'

let socket;
const ENDPOINT = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_URL_DEV : process.env.REACT_APP_SERVER_URL_PRODUCTION

const Game = () => {

	let { room } = useParams();
	const [game, setGame] = useState({})
	const [currentUser, setCurrentUser] = useState('')
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)


	//SETUP SOCKET
	useEffect( () => {

		const gameInfo = JSON.parse(sessionStorage.getItem('game'));

		if(!gameInfo) {
			setError(true)
			return 
		}

		if(gameInfo) {

			const {name} = gameInfo;
			socket = io(ENDPOINT);
			socket.emit('join', {name, room}, (response) => {
				if(response.error) {
					setError(true)
				} else {
					setCurrentUser(response)
				}
			});
			return () => {
				socket.emit('disconnect');
				socket.off();
			}
		} else {
			setError(true)
		}

	}, [room])

	//HANDLING ONLINE USERS
	useEffect( () => {

		if(socket) {
			socket.on("onlineUsers", ({ users }) => {
		      setUsers(users);
		    });
		}

	}, [users])

	useEffect( () => {

		if(socket) {
			socket.on("GameUpdate", (game) => {
		      setGame(game);
		      setLoading(false)
		    });
		}

	}, [])

	const handleStartGame = (e) => {
		e.preventDefault(); 
		socket.emit('startGame')
	}

	console.log(game)
	
	if(error) {
		return <Redirect to='/' />
	}

	if(!game.started) {
		return <Lobby users={users} startGame={handleStartGame}/>
	}

	return (

		<div>


		started
		</div>


		)
	}

export default Game