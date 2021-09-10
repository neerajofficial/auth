import React from 'react'
import styles from './styles.module.css'
import Lock from './../../../assets/icons/lock.svg'
import Avatar from './../../ui/avatar'
import Text from './../../ui/text'

const Header = ({ fromText }) => {
	return (
		<div className={styles.header}>
			<Avatar icon={Lock} />
			<Text variant="h4">{fromText}</Text>
		</div>
	)
}

export default Header