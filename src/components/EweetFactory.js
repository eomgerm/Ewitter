import React, { useState, useRef } from 'react';
import { dbService, storageService } from '../fbInstance';
import {
	addDoc,
	collection,
	serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
	const [eweet, setEweet] = useState('');
	const [attachment, setAttachment] = useState();
	const attachmentInput = useRef();
	const onSubmit = async (event) => {
		event.preventDefault();
		const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
		let attachmentUrl = '';
		if (attachment) {
			const res = await uploadString(attachmentRef, attachment, 'data_url');
			attachmentUrl = await getDownloadURL(res.ref);
			console.log(attachmentUrl);
		}
		const newNweet = {
			text: eweet,
			createdAt: serverTimestamp(),
			creatorId: userObj.uid,
			edited: false,
			editedAt: null,
			attachmentUrl,
		};

		try {
			const docRef = await addDoc(collection(dbService, 'eweets'), newNweet);
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
		setEweet('');
		setAttachment(null);
		attachmentInput.current.value = null;
	};
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setEweet(value);
	};
	const onFileChange = (event) => {
		const {
			target: { files },
		} = event;
		const imgFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (doneEvent) => {
			const {
				currentTarget: { result },
			} = doneEvent;
			setAttachment(result);
		};
		reader.readAsDataURL(imgFile);
	};
	const onClearClick = () => {
		attachmentInput.current.value = null;
		setAttachment(null);
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
				<input type="file" accept="image/*" onChange={onFileChange} ref={attachmentInput} />
				<input onSubmit={onSubmit} type="submit" value="Eweet" />
			</form>
			{attachment && (
				<div>
					<img src={attachment} width="50px" height="50px" alt="Error" />
					{<button onClick={onClearClick}>Clear</button>}
				</div>
			)}
		</div>
	);
};

export default NweetFactory;