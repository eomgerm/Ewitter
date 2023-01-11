import React, { useState, useEffect } from 'react';
import authService, { dbService } from '../fbInstance';
import { useHistory } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth'

const Profile = ({ refreshUser, userObj }) => {
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	const histroy = useHistory();
	const onLogOutClick = () => {
		authService.signOut();
		histroy.push('/');
	};
	const getMyEweet = async () => {
		const q = query(
			collection(dbService, 'eweets'),
			where('creatorId', '==', userObj.uid),
			orderBy('createdAt', 'desc')
		);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			console.log(doc.id, ' => ', doc.data());
		});
	};
	useEffect(() => {
		getMyEweet();
	}, []);
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewDisplayName(value);
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		if (userObj.displayName !== newDisplayName) {
			await updateProfile(authService.currentUser, {displayName: newDisplayName});
			refreshUser();
		}
	};
	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="Type your new name."
					value={newDisplayName}
					onChange={onChange}
					required
				/>
				<input type="submit" value="Update Profile" />
			</form>
			<button onClick={onLogOutClick}>Logout</button>
		</>
	);
};

export default Profile;