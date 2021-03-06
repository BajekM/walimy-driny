import Axios from 'axios';

/* selectors */
export const getOrders = ({orders}) => orders.data;
export const getBasket = ({orders}) => orders.basket;
export const getLoadingState = ({orders}) => orders.loading;

/* action name creator */
const reducerName = 'orders';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const CHANGE_AMOUNT = createActionName('CHANGE_AMOUNT');
const INCREASE_AMOUNT = createActionName('CHANGE_AMOUNT');
const ADD_TO_BASKET = createActionName(' ADD_TO_BASKET');
const DELETE_PRODUCT = createActionName('DELETE_PRODUCT');
const SET_BASKET = createActionName('SET_BASKET');
const ADD_ORDER = createActionName('ADD_ORDER');
const SET_ID = createActionName('SET_ID');
const SET_STATUS = createActionName('SET_STATUS');
const EMPTY_BASKET = createActionName('EMPTY_BASKET');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const setAmount = payload => ({ payload, type: CHANGE_AMOUNT });
export const increaseAmount = payload => ({ payload, type: INCREASE_AMOUNT });
export const addToBasket = payload => ({payload, type: ADD_TO_BASKET});
export const deleteOne = payload => ({payload, type: DELETE_PRODUCT});
export const setBasket = payload => ({payload, type: SET_BASKET});
export const addNewOrder = payload => ({payload, type: ADD_ORDER});
export const setId = payload => ({payload, type: SET_ID});
export const setStatus = payload => ({payload, type: SET_STATUS});
export const emptyBasket = payload => ({payload, type: EMPTY_BASKET});


/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.orders.data.length === 0 && !state.orders.loading.active) {
      dispatch(fetchStarted());

      Axios
        .get('http://localhost:8000/api/orders')
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

export const fetchBasket = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.orders.loading.active && !state.orders.basket) {
      // dispatch(fetchStarted());

      Axios
        .get('http://localhost:8000/api/orders/basket')
        .then(res => {
          console.log('res.data', res.data);
          res.data ?
            dispatch(setBasket(res.data)) :
            dispatch(emptyBasket({}));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
          dispatch(emptyBasket({}));
        });
    }
  };
};



export const addProdToBasket = (obj, id) => {
  return (dispatch, getState) => {
    const state = getState();


    if (!state.orders.basket.products) {

      dispatch(addToBasket(obj));

      Axios
        .post('http://localhost:8000/api/orders', { product: obj, basketId: id })
        .then(res => {
          dispatch(addNewOrder(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });

    } else {

      dispatch(addToBasket(obj));

      Axios
        .put('http://localhost:8000/api/orders/basket', { products: obj })
        .then(res => {
          dispatch(setAmount(obj));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };

};


export const changeAmount = (obj) => {
  return (dispatch) => {
    dispatch(setAmount(obj));

    Axios
      .put('http://localhost:8000/api/orders/basket', {products: obj})
      .then(res => {
        dispatch(setBasket(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });

  };
};

export const deleteProduct = (obj) => {
  return (dispatch) => {
    dispatch(deleteOne(obj.productId));

    Axios
      .put('http://localhost:8000/api/orders/basket', {products: obj.elements ? obj.elements : [] })
      .then(res => {
        dispatch(setAmount(obj.elements));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });

  };
};

export const changeStatus = (status) => {
  return (dispatch) => {
    Axios
      .put('http://localhost:8000/api/orders/basket', {status: status})
      .then(res => {

      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });

  };
};

export const actualizeComment = (products) => {
  return (dispatch) => {
    dispatch(addToBasket(products));

    Axios
      .put('http://localhost:8000/api/orders/basket', {products: products})
      .then(res => {
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });

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
    case CHANGE_AMOUNT: {
      return {
        ...statePart,
        basket: {...statePart.basket, products: action.payload},
      };
    }
    case ADD_TO_BASKET: {
      return {
        ...statePart,
        basket: {...statePart.basket, products: action.payload},
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...statePart,
        basket: {...statePart.basket, products: statePart.basket.products.filter(product => product._id !== action.payload)},
      };
    }
    case SET_BASKET: {
      return {
        ...statePart,
        basket: {...action.payload[0]},
      };
    }
    case ADD_ORDER: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
        basket: action.payload,
      };
    }
    case SET_ID: {
      return {
        ...statePart,
        basket: {...statePart.basket, id: action.payload.basketId},
      };
    }
    case SET_STATUS: {
      return {
        ...statePart,
        basket: {...statePart.basket, status: action.payload},
      };
    }
    case EMPTY_BASKET: {
      return {
        ...statePart,
        basket: action.payload,
      };
    }
    default:
      return statePart;
  }
};
