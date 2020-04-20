import Axios from 'axios';

/* selectors */
export const getAll = ({products}) => products.data;
export const getLoadingState = ({products}) => products.loading;

/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const CHANGE_PARAM = createActionName('CHANGE_PARAM');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const changeParam = payload => ({ payload, type: CHANGE_PARAM });

/* thunk creators */
export const fetchAllProducts = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.products.data.length === 0 && !state.products.loading.active) {
      dispatch(fetchStarted());

      Axios
        .get('http://localhost:8000/api/products')
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
    case CHANGE_PARAM: {
      return {
        ...statePart,
        data: statePart.data.map(item => item._id !== action.payload.productId ?
          item: {...item, params: item.params.map(param => param.name !== action.payload.name ?
            param : {...param, ordered: action.payload.value})}),
      };
    }
    default:
      return statePart;
  }
};
