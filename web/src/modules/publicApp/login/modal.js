export const SHOW_LOGIN_MODAL = 'modal/SHOW_LOGIN_MODAL';
export const HIDE_LOGIN_MODAL = 'modal/HIDE_LOGIN_MODAL';

/* Registration flow starts with step 0, implying that the flow
hasn't been initiated. Step 1 initiates the registration process
and anteceding steps onboards the user by complementing additional
data about themselves. */
const initialState = {
  visible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
    {
      return {
        ...state,
        visible: true
      };
    }
    case HIDE_LOGIN_MODAL:
    {
      return {
        ...state,
        visible: false
      };
    }
    default:
      return state
  }
};

export const showLoginModal = () => {
  return async(dispatch) => {
    dispatch({type: SHOW_LOGIN_MODAL});
  };
};

export const hideLoginModal = () => {
  return async(dispatch) => {
    dispatch({type: HIDE_LOGIN_MODAL});
  };
};
