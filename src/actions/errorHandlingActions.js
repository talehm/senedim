
import { ADD_NEW_SECTION_ERROR } from './type';

export const errorAddNewSection = status=> dispatch=> {
  dispatch({
    type: ADD_NEW_SECTION_ERROR,
    payload: status,
  })
};
