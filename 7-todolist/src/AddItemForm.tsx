//import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


type PropsType = {
	addItem: (title:string) => void
}

export const AddItemForm = ({addItem}: PropsType) => {

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
		setError(null)
		if (event.key === 'Enter') {
			addItemHandler()
		}
	}

	const buttonStyled ={
		maxWidth: '38px',
		maxHeight: '38px',
		minWidth: '38px',
		minHeight: '38px'
	}

	return (
		<div>
			{/*<input*/}
			{/*	className={error ? 'error' : ''}*/}
			{/*	value={title}*/}
			{/*	onChange={changeItemHandler}*/}
			{/*	onKeyUp={addItemOnKeyUpHandler}*/}
			{/*/>*/}
			<TextField
				//helperText={error}
				error={!!error}
				size={"small"}
				id="outlined-basic"
				label={error ? error : "Enter a title"}
				variant="outlined"

				className={error ? 'error' : ''}
				value={title}
				onChange={changeItemHandler}
				onKeyUp={addItemOnKeyUpHandler}
			/>
			<Button
				variant="contained"
				onClick={addItemHandler}
				size="small"
				style={buttonStyled}
			>+</Button>
			{/*<Button title={'+'} onClick={addItemHandler}/>*/}
			{/*{error && <div className={'error-message'}>{error}</div>}*/}
		</div>
	)
}


