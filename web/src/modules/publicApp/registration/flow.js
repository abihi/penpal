const axios = require('axios');
export const CHANGE_REGISTRATION_FLOW_STEP = 'flow/CHANGE_REGISTRATION_FLOW_STEP';

/* Registration flow starts with step 0, implying that the flow
hasn't been initiated. Step 1 initiates the registration process
and anteceding steps onboards the user by complementing additional
data about themselves. */
const initialState = {
  step: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_REGISTRATION_FLOW_STEP:
    {
      return {
        ...state,
        step: action.payload
      };
    }
    default:
      return state
  }
};

export const changeRegistrationFlowStep = (step = 0) => {
  return async(dispatch) => {
    dispatch({type: CHANGE_REGISTRATION_FLOW_STEP, payload: step});    
  };
};
