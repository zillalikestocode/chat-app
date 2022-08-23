import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'
import reducer from './reducers'
import './index.css'

const store = createStore(reducer, {}, compose(applyMiddleware(thunk)))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
)
