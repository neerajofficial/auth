import React from 'react'
import styles from './styles.module.css'

const FormControl = props => {
	return (
		<div className={styles.formControl} {...props} >
			{props.children}
		</div>
	)
}

export default FormControl