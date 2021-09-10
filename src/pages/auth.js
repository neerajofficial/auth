import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useFormik } from 'formik';
import AuthUser from './../components/auth'
import Validation from './../utils/validation'
import * as actions from './../store/actions'

const Auth = props => {
	const [newUser, setNewUser] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const formik = useFormik({
	    initialValues: {
	      email: '',
	      password: ''
	    },
	    validationSchema: Validation,
	    onSubmit: (values) => formHandler(values)
	});

	const showPasswordHandler = () => setShowPassword(!showPassword);
	const toggleFormHandler = () => setNewUser(!newUser);

	const formHandler = values => {
		if (newUser) {
			props.signup(values)
		} else {
			props.signin(values)
		}
	}

	return <AuthUser
		formik={formik}
		newUser={newUser}
		toggleForm={toggleFormHandler}
		showPassword={showPassword}
		showPasswordClicked={showPasswordHandler}
	/>
}


const mapDispatchToProps = dispatch => {
	return {
		signup: user => dispatch(actions.signup(user)),
		signin: user => dispatch(actions.signin(user))
	}
}

export default connect(null, mapDispatchToProps)(Auth)