import React, { useState } from 'react';
import authService from '../fbInstance';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState('');

	const onChange = (event) => {
		const {
			target: { name, value },
		} = event;
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			if (newAccount) {
				await createUserWithEmailAndPassword(authService, email, password);
			} else {
				await signInWithEmailAndPassword(authService, email, password);
			}
		} catch (error) {
			setError(error.message);
		}
	};
	const toggleAccount = () => {
		setNewAccount((prev) => !prev);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" placeholder="Email" name="email" onChange={onChange} required />
				<input
					type="password"
					placeholder="Password"
					name="password"
					onChange={onChange}
					required
				/>
				<input type="submit" value={newAccount ? 'Create account' : 'Sign in'} />
				{error}
			</form>
			<span onClick={toggleAccount}>{newAccount ? 'Sign in' : 'Create account'}</span>
		</div>
	);
};

export default AuthForm;