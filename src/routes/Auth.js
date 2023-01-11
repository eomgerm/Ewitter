import React from 'react';
import authService from '../fbInstance';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import AuthForm from '../components/AuthForm'

const Auth = () => {
	const onSocialClick = async () => {
		const provider = new GoogleAuthProvider();
		console.log(provider);
		await signInWithPopup(authService, provider);
	};

	return (
		<div>
			<AuthForm />
			<div>
				<button onClick={onSocialClick} name="google">
					Continue with Google
				</button>
			</div>
		</div>
	);
};
export default Auth;