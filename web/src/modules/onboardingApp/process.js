export const CHANGE_ONBOARDING_STEP = 'process/CHANGE_ONBOARDING_STEP';

const initialState = {
  step: 0,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ONBOARDING_STEP:
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

export const changeOnboardingStep = (step = 0) => {
  return async(dispatch) => {
    dispatch({type: CHANGE_ONBOARDING_STEP, payload: step});
  };
};
