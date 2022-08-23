import { combineReducers } from 'redux'
import auth from './auth'
import rooms from './rooms.js'
import messages from './messages.js'

export default combineReducers({
    auth,
    rooms,
    messages
})