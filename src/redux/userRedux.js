import Axios from 'axios';

/* selectors */
export const getUser = ({user}) => user.data;

/* action name creator */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const LOG_OUT = createActionName('LOG_OUT');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const logOut = payload => ({ payload, type: LOG_OUT });

/* thunk creators */
export const fetchUser = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.user.data) {
      dispatch(fetchStarted());

      Axios
        .get('http://localhost:8000/user')
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }else {
      console.log('Not fetched');
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case LOG_OUT: {
      return {
        ...statePart,
        data: 'loggedOut',
      };
    }
    default:
      return statePart;
  }
};
