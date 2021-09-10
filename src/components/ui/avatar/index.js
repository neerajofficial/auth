import React from 'react'
import styles from './styles.module.css'

const Avatar = props => {
	return (
		<div className={styles.avatar}>
			<img src={props.icon} alt="Avatar icon" />
		</div>
	)
}

export default Avatar