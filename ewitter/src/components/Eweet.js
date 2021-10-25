import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { dbService } from '../fbInstance';

const Eweet = ({ eweetObj, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [editText, setEditText] = useState(eweetObj.text);
	const onDeleteClick = async () => {
		const ok = window.confirm('Are you sure to delete?');
		if (ok) {
			await deleteDoc(doc(dbService, 'eweets', `${eweetObj.id}`));
		}
	};
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setEditText(value);
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		const ok = window.confirm('Are you sure to edit?');
		if (ok) {
			await updateDoc(doc(dbService, 'eweets', `${eweetObj.id}`), {
				text: editText,
				edited: true,
				editedAt: serverTimestamp()
			});
		}
		toggleEditing();
	};

	const toggleEditing = () => setEditing((prev) => !prev);
	return (
		<div>
			{editing ? (
				<>
					<form onSubmit={onSubmit}>
						<input
							type="text"
							onChange={onChange}
							value={editText}
							placeholder="Edit your eweet"
							required
						/>
						<input type="submit" value="Update Eweet" />
					</form>
					<button onClick={toggleEditing}>Cancel</button>
				</>
			) : (
				<>
					<h4>{eweetObj.text}</h4>
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>Delete</button>
							<button onClick={toggleEditing}>Edit</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Eweet;