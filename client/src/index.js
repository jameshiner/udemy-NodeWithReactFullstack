import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';

/*
 * all of our state exists in a *redux store*
 * to determine/change current state, we call an *action creator* which dispatches an *action*
 * the *action* is then sent to all the different *reducers*
 * those reducers are then combined with the *combineReducers* call
 * which is then used to update the state in the *redux store*
 *
 * in this file we will create a redux store and render a *provider tag*
 * the *provider* tag is provided by react-redux library (makes react/redux work together nicely)
 * because the *provider tag* is at the very parent component, any other comp can reach into
 * the *redux store* and pull out some state thanks to the *provider tag*
 *
 */

// params: combination of reducers from combineReducer, initial state, enchancer
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root'),
);
