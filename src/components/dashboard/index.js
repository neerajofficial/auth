import React from 'react'
import Navigation from './../navigation'
import styles from './styles.module.css'

const UserDashboard = props => {
	return (
		<div className={styles.root}>
			<Navigation />	
			<h1>User Dashboard</h1>
		</div>
	)
}

export default UserDashboard