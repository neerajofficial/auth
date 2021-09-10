import React from 'react'
import styles from './styles.module.css'

const Input = ({label, id, ...props}) => {

	return (
		<div className={styles.input}>
			<label htmlFor={id}>{label}</label>
			<input {...props} />
		</div>
	)
}

export default Input