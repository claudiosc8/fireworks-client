import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useParams, Redirect } from 'react-router-dom'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Lobby from './Lobby'
import Card from './Card'
import '../css/Game.css';

let socket;
const ENDPOINT = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_URL_DEV : process.env.REACT_APP_SERVER_URL_PRODUCTION

const Game = () => {

	let { room } = useParams();
	const [game, setGame] = useState({})
	const [currentUser, setCurrentUser] = useState('')
	const [colors] = useState(['red', 'white', 'blue', 'green', 'yellow'])
	const [users, setUsers] = useState([]);
	const [currentPlayer, setCurrentPlayer] = useState({});
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)
	const [selected, setSelected] = useState(undefined)
	const [hint, setHint] = useState({})

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
					setError({message:response.error})
				} else {
					setCurrentUser(response.name)
				}
			});
			return () => {
				socket.emit('disconnect');
				socket.off();
			}
		} else {
			setError({redirect:true})
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

	useEffect( () => {

		if(game.started && currentUser) {
			const player = game.players.find(player => player.name === currentUser)
			const copy = Object.assign({}, player)
			copy.hisTurn = game.currentTurn === copy.order
      		setCurrentPlayer(copy)
		}

	}, [game, currentUser])
			      

	const handleStartGame = (e) => {
		e.preventDefault(); 
		socket.emit('startGame')
	}

	const handleSelect = (i) => {
		const index = selected === i ? undefined : i
		setSelected(index)
	}

	const handleSelectHint = (type, value) => {
		const data = (hint.value === value && hint.type === type) ? {} : {type, value}
		setHint(data)
	}

	const handlePlayCard = (type) => {

		if(type === 'discard' || type === 'play') {
			const data = {type, action: selected}
			socket.emit('playTurn', data)
			setSelected(undefined)
		} 
		
	}

	const handlePlayHint = (type, target) => {

		if(type === 'hint') {
			const action = Object.assign({}, hint)
			action.target = target;
			const data = {type, action}
			socket.emit('playTurn', data)
			setHint({})
		}
		
	}

	if(error && error.redirect) {
		return <Redirect to='/' />
	}

	if(error && error.message) {
		return error.message
	}

	if(!game.started) {
		return <Lobby users={users} startGame={handleStartGame}/>
	}

	if(currentPlayer) {

	console.log(game, currentPlayer)

	return (

		<div id="game">
		{game.cards.hands.map((hand,i) => {

			const current = currentPlayer && currentPlayer.order === i;

			return (
			<React.Fragment key={i}>
			{game.currentTurn === i ? 'current turn' : ''}
			{(hint.value !== undefined && hint.type !==  undefined && !current) ? 'selectable' : ''}
			<ul onClick={() => (hint.value !== undefined && hint.type !==  undefined) ? handlePlayHint('hint', i) : null}>
			{hand.map((card,i) => 
				<li key={i}>
				<Card 
					value={card.value} 
					color={card.color} 
					currentPlayer={current} 
					selected={selected === i}
					onClick={() => current && currentPlayer.hisTurn ? handleSelect(i) : null}
				/>
				</li>)
			}</ul>
			</React.Fragment>)

		} )}

		<div>Deck: {game.cards.deck.length}</div>
		<div onClick={() => selected !== undefined ? handlePlayCard('discard') : null}>Discard pile: {game.cards.discardPile.length}</div>
		<div onClick={() => selected !== undefined ? handlePlayCard('play') : null}>Table: 
			<ul> 
				{colors.map((color,i) => <li key={i}>{color}: {game.cards.table[color]}</li>)}
			</ul>
		</div>
		<div>Note tokens: {game.noteTokens}</div>
		<div>Storm tokens: {game.stormTokens}</div>
		<div>Hints: 
			<div>{colors.map((color,i) => <span key={i} onClick={() => currentPlayer.hisTurn ? handleSelectHint('color', color) : null}>{color}{hint.value === color ? 'selected' : ''}</span>)}</div>
			<div>{colors.map((e,i) => <span key={i} onClick={() => currentPlayer.hisTurn ? handleSelectHint('value', i+1) : null}>{i+1}{hint.value === i ? 'selected' : ''}</span>)}</div>
		</div>
		</div>


		)
	}
	}

export default Game