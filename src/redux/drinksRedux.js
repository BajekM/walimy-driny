import Axios from 'axios';

/* selectors */
export const getAll = ({drinks}) => drinks.data;

/* action name creator */
const reducerName = 'drinks';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.drinks.data.length === 0 && !state.drinks.loading.active) {
      dispatch(fetchStarted());

      Axios
        .get('http://localhost:8000/api/drinks')
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
        ...statePart,
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
    default:
      return statePart;
  }
};
