import axios from './../../axios';
import * as actionTypes from './actionTypes'

const userCreated = message => {
	return  {
		type: actionTypes.USER_CREATED,
		payload: message
	}
}

const userLoggedIn = data => {
	return {
		type: actionTypes.USER_LOGEDIN,
		payload: data
	}
}

const authError = message => {
	return {
		type: actionTypes.AUTH_ERROR,
		payload: message
	}
}


const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, expirationTime * 1000)
	}
}

export const signup = user => {
	return dispatch => {
		axios.post('/auth/signup', user)
		.then(response => {
			dispatch(userCreated(response.data.message))
		})
		.catch(error => {
			let errormessage = 'Something went wrong';
			if (error.response) {
				errormessage = error.response.data.message;
			}
			dispatch(authError(errormessage))
		})
	}
}

export const signin = user => {
	return dispatch => {
		axios.post('/auth/signin', user)
		.then(resp => {
			const expirationDate = new Date(new Date().getTime() + +resp.data.expiresIn * 1000);
			localStorage.setItem('token', resp.data.token);
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('user_id', resp.data.user_id);

			dispatch(userLoggedIn(resp.data))
			dispatch(checkAuthTimeout(resp.data.expiresIn))
		})
		.catch(error => {
			let errormessage = 'Something went wrong';
			if (error.response) {
				errormessage = error.response.data.message;
			}
			dispatch(authError(errormessage))
		})
	}
}

export const getAuth = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate > new Date()) {
				const user_id = localStorage.getItem('user_id')
				dispatch(userLoggedIn({token: token, user_id: user_id}))
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
			} else {
				dispatch(logout())
			}
		}
	}
}

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('user_id');
	localStorage.removeItem('expirationDate');

	return {
		type: actionTypes.AUTH_LOGOUT
	}
}