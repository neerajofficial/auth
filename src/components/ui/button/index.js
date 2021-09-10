import React from 'react'
import styles from './styles.module.css'

const Button = ({ variant, text, ...props }) => {
	const classes = [styles.button, styles[variant]].join(' ');
	return (
		<div className={styles.container}>
			<button className={classes} {...props}>
				{text}
			</button>
		</div>
	)
}

export default Button