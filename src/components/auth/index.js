import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.module.css'
import AuthForm from './authForm'
import Header from './header'
import Button from './../ui/button'

const AuthUser = props => {
	const { formik, newUser, toggleForm, showPassword, showPasswordClicked, message } = props;

	const fromText = newUser ? "Sign Up" : "Sign in";
	const linkText = newUser ? "Already have an account? Sign In" : "Don't have an account? Sign Up";

	const error = message && <div className={styles.message}> <p>{message}</p></div>
	
	return (
		<div className={styles.root}>
			<div className={styles.image} />
			<div className={styles.form}>
				<Header fromText={fromText} />
				{error}
				<AuthForm
					formik={formik}
					showPassword={showPassword}
					showPasswordClicked={showPasswordClicked}
					buttonText={fromText} />
				<Button 
					type="button"
					variant="basic"
					text={linkText}
					onClick={toggleForm} />
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		message: state.auth.message
	}
}

export default connect(mapStateToProps)(AuthUser);