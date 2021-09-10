import React from 'react'
import styles from './styles.module.css'

const Text = ({ variant, children, ...rest }) => {
	return (
		<p className={styles[variant]} {...rest} >
			{ children }
		</p>
	)
}

export default Text