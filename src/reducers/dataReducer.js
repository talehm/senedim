import {
        FETCH_PRODUCT_CATEGORY,
        FETCH_PRODUCTS_BY_CATEGORY,
        FETCH_DEFAULT_TEMPLATE_SECTIONS,
        ADD_NEW_TEMPLATE_SECTION,
        UPDATE_TEMPLATE_SECTION,
        UPDATE_TEMP_DATA,
        FETCH_TEMP_DATA,
        DELETE_TEMP_DATA,
      } from '../actions/type';
import merge from 'lodash/merge';
const initialState = {
  category: [],
  products: [],
  sections: [],
  data:{
    cv:{
      personal:{}
    }
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_CATEGORY:
      return {
        ...state,
        category:action.payload
      };
    case FETCH_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        products: action.payload
      };

    case FETCH_DEFAULT_TEMPLATE_SECTIONS:
      return {
        ...state,
        sections: action.payload
        };
    case ADD_NEW_TEMPLATE_SECTION:
      return {
        ...state,
        sections: state.sections.concat(action.payload)
        };
    case UPDATE_TEMPLATE_SECTION:
        return {
          ...state,
          sections: action.payload
          };
    case FETCH_TEMP_DATA:
        return{
          ...state,
          data: merge({}, state.data, action.payload)
        };
    case UPDATE_TEMP_DATA:
        return{
          ...state,
          data: merge({}, state.data, action.payload)
        };
    case DELETE_TEMP_DATA:
        return{
          ...state,
          data:{
            ...state['data'],
            cv:{
              ...state['data'][action.category],
              personal:{
                ...state.data[action.category][action.section],
                [action.field]:[...state.data[action.category][action.section][action.field]].filter((x, index) => index !== action.index)
              }
            }
          }

        };
    default:
      return state;
  }
}
