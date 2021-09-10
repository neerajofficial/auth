import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import * as actions from './store/actions';
import { Switch, Route, Redirect } from 'react-router-dom'

import Auth from './pages/auth'
import Dashboard from './pages/dashboard'

const App = props => {
	const { checkauth, token } = props;
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		checkauth();
	}, [checkauth])

	useEffect(() => {
		if (token) {
			setIsAuth(true)
		} else {
			setIsAuth(false)
		}
	}, [token]);

	return (
		<>
			<Switch>
				{
					isAuth 
					? <Route component={PrivateRoutes} />
					: <Route component={AuthRoutes} /> 
				}
			</Switch>
		</>
	)
}

const AuthRoutes = () => (
	<>
		<Route path="/auth" component={Auth} />
		<Redirect to="/auth" />
	</>
);

const PrivateRoutes = props => {
	return (
		<>	
			<Route path="/dashboard" component={Dashboard} />
			<Redirect to="/dashboard" />
		</>
	)
};

const mapStateToProps = state => {
	return {
		token: state.auth.token
	}
}

const mapDispatchToProps = dispatch => {
	return {
		checkauth: () => dispatch(actions.getAuth()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
