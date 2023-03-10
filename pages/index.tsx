import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { SyntheticEvent, useState } from 'react'
import styles from '../styles/Home.module.css'
import Header from './_header.tsx'

type newMessage = {
	id: number;
	content: string;
	num: number;
}

const Home: NextPage = () => {
	const [num, setNum] = useState<string>();
	const [flightChat, setFlightChat] = useState();
	
	function changeFlightNumber(event: React.ChangeEvent<HTMLInputElement>){
		const { value } = event.target;
		setNum(value);
	}

	function submitNumber(event: SyntheticEvent){
		event.preventDefault();
		fetch('/api/getMessages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({"num":num})
		})
			.then(response => response.json())
			.then(data => setFlightChat(JSON.parse(data)))
			.catch(error => console.error(error));
	}
	
	return (
		<>
			<Header>
			</Header>
			<div className={styles.bigImg}>
				<h1>
					FlightMates
				</h1>
				<h3>
					chatta con i tuoi compagni di volo
				</h3>
				<input
					className={styles.bigImgInput}
					name="newNum"
					value={ num }
					onChange={changeFlightNumber}
					placeholder="Numero di volo..."></input>
				<button
					className={styles.bigImgSubmit}
					name="submit"
					onClick={ submitNumber }></button>
			</div>
			<p>
				{flightChat}
			</p>
		</>
	)
}

export default Home
