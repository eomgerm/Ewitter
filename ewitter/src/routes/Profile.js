import React from 'react';
import authService from '../fbInstance';
import { useHistory } from 'react-router-dom';

const Profile = () => {
	const histroy = useHistory();
	const onLogOutClick = () => {
		authService.signOut();
		histroy.push('/');
	};

	return (
		<>
			<button onClick={onLogOutClick}>Logout</button>
		</>
	);
};

export default Profile;