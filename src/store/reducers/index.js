import { combineReducers } from 'redux';
import Auth from './auth';

const Reducers = combineReducers({
	auth: Auth
})

export default Reducers;