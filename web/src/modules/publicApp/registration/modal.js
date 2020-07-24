export const SHOW_REGISTRATION_MODAL = 'modal/SHOW_REGISTRATION_MODAL';
export const HIDE_REGISTRATION_MODAL = 'modal/HIDE_REGISTRATION_MODAL';

/* Registration flow starts with step 0, implying that the flow
hasn't been initiated. Step 1 initiates the registration process
and anteceding steps onboards the user by complementing additional
data about themselves. */
const initialState = {
  visible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_REGISTRATION_MODAL:
    {
      return {
        ...state,
        visible: true
      };
    }
    case HIDE_REGISTRATION_MODAL:
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

export const showRegistrationModal = () => {
  return async(dispatch) => {
    dispatch({type: SHOW_REGISTRATION_MODAL});
  };
};

export const hideRegistrationModal = () => {
  return async(dispatch) => {
    dispatch({type: HIDE_REGISTRATION_MODAL});
  };
};
