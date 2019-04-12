import { ADD_NEW_SECTION_ERROR } from '../actions/type';

const initialState = {
  error: false,

};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_SECTION_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
