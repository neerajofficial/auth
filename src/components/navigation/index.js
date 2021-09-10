import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.module.css'
import Button from './../ui/button'
import * as actions from './../../store/actions'

const Navigation = props => {
	return (
		<div className={styles.root}>
			<div>
				Logo
			</div>
			<div>
				<Button 
					type="button"
					variant="secondary" 
					text="Logout"
					onClick={props.logout} />
			</div>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.logout())
	}
}

export default connect(null, mapDispatchToProps)(Navigation)