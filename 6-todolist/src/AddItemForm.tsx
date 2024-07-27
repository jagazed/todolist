import {Button} from "./Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type PropsType = {
	addItem: (title:string) => void
}

export const AddItemForm = React.memo(({addItem}: PropsType) => {
	console.log("AddItemForm is called")

	const [title, setTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addItemHandler = () => {
		if (title.trim() !== '') {
			addItem(title.trim())
			setTitle('')
		} else {
			setError('Title is required')
		}
	}

	const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}

	const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null){
			setError(null)
		}
		if (event.key === 'Enter') {
			addItemHandler()
		}
	}
	return (
		<div>
			<input
				className={error ? 'error' : ''}
				value={title}
				onChange={changeItemHandler}
				onKeyUp={addItemOnKeyUpHandler}
			/>
			<Button title={'+'} onClick={addItemHandler}/>
			{error && <div className={'error-message'}>{error}</div>}
		</div>
	)
});


