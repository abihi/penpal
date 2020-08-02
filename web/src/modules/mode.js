export const SWITCH_APP_MODE = 'mode/SWITCH_APP_MODE';

const initialState = {
  currentMode: 'initial',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_APP_MODE:
    {
      return {
        ...state,
        currentMode: action.payload
      };
    }
    default:
      return state
  }
};

export const switchAppMode = (mode = 'public') => {
  return async(dispatch) => {
    dispatch({type: SWITCH_APP_MODE, payload: mode});
  };
};
