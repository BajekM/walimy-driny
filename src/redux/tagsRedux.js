
/* selectors */
export const getTags = ({tags}) => tags;

/* action name creator */
const reducerName = 'tags';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_TAG = createActionName('ADD_TAG');
const REMOVE_TAG = createActionName('REMOVE_TAG');

/* action creators */
export const addTag = payload => ({ payload, type: ADD_TAG });
export const removeTag = payload => ({ payload, type: REMOVE_TAG });

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_TAG:
      return [...statePart, action.payload];
    case REMOVE_TAG:
      return statePart.filter(tag => tag !== action.payload);
    default:
      return statePart;
  }
};
