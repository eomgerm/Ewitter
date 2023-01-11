import React, { useState, useEffect } from 'react';
import { dbService } from '../fbInstance';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Eweet from '../components/Eweet';
import EweetFactory from '../components/EweetFactory';

const Home = ({ userObj }) => {
	const [eweets, setEweets] = useState([]);
	useEffect(() => {
		const q = query(collection(dbService, 'eweets'), orderBy('createdAt', 'desc'));
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

	return (
		<div>
			<EweetFactory userObj={userObj} />
			<div>
				{eweets.map((eweet) => (
					<Eweet
						key={eweet.id}
						eweetObj={eweet}
						isOwner={userObj.uid === eweet.creatorId}
					/>
				))}
			</div>
		</div>
	);
};
export default Home;