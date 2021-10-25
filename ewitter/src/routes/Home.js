import React, { useState, useEffect } from 'react';
import { dbService } from '../fbInstance';
import {
	addDoc,
	collection,
	serverTimestamp,
	onSnapshot,
	orderBy,
	query,
} from 'firebase/firestore';
import Eweet from '../components/Eweet'

const Home = ({ userObj }) => {
	const [eweet, setEweet] = useState('');
	const [eweets, setEweets] = useState([]);
	useEffect(() => {
		const q = query(collection(dbService, 'eweets'), orderBy('createdAt',"desc"));
		onSnapshot(q, (querySnapshot) => {
			const eweetsArr = querySnapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
			setEweets(eweetsArr);
		});
	}, []);
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const docRef = await addDoc(collection(dbService, 'eweets'), {
				text: eweet,
				createdAt: serverTimestamp(),
				creatorId: userObj.uid,
				edited: false,
				editedAt: null
			});
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
		setEweet('');
	};
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setEweet(value);
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					value={eweet}
					onChange={onChange}
					type="text"
					placeholder="What's happening?"
					max={120}
				/>
				<input onSubmit={onSubmit} type="submit" value="Eweet" />
			</form>
			<div>
				{eweets.map((eweet) => (
					<Eweet key={eweet.id} eweetObj={eweet} isOwner={userObj.uid === eweet.creatorId} />
				))}
			</div>
		</div>
	);
};
export default Home;