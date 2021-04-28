import axios from 'axios';
import { FETCH_USER } from './types';

/*
 * react component calls an action creator
 * action creator produces an action and passes it to the dispatch function (redux store)
 * if we call the dispatch function with an action, the action will be fwd to all reducers
 * reducers run, produce new value for state, and pass that back to the store
 *
 * redux-thunk just gives us direct access to dispatch function
 * bends the rules and allows us to manually dispatch an action from action creator
 * rather than requiring us to return it from the action creator
 *
 * because we wired redux-thunk up as a middleware
 * redux-thunk then inspects whatever value we return from an action creator
 * if a function is returned instead of an action, redux-thunk automatically calls it with
 * the dispatch function mentioned above as an argument
 *
 * this is beneficial to API calls because you dont want to dispatch the action until the API
 * call is finished
 *
 */

/*
  * normal method of dispatching actions without redux-thunk
  *
  * const fetchUser = () => {
  *   const response = axios.get('/api/user');
  *
  *   return {
  *    type: FETCH_USER,
  *    payload: response,
  *   };
  * }
  *
  */

export const fetchUser = () => async (dispatch) => {
  const { data: payload } = await axios.get('/api/user');
  dispatch({
    type: FETCH_USER,
    // response.data is the user model and thats all we really need
    payload,
  });
};

export const handleStripeToken = (token) => async (dispatch) => {
  const { data: payload } = await axios.post('/api/stripe', token);
  dispatch({
    type: FETCH_USER,
    payload,
  });
};
