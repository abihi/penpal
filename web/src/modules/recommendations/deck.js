export const SET_CURRENT_DECK_COUNT = 'deck/SET_CURRENT_DECK_COUNT';

const initialState = {
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_DECK_COUNT:
    {
      return {
        ...state,
        count: action.count
      };
    }
    default:
      return state
  }
};

export const setDeckCount = (count=0) => {
  return async(dispatch) => {
    dispatch({type: SET_CURRENT_DECK_COUNT, count: count});
  };
};
