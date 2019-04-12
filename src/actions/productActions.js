
import {
  FETCH_PRODUCT_CATEGORY,
  FETCH_PRODUCTS_BY_CATEGORY,
  FETCH_DEFAULT_TEMPLATE_SECTIONS,
  ADD_NEW_TEMPLATE_SECTION,
  UPDATE_TEMPLATE_SECTION,
  UPDATE_TEMP_DATA,
  FETCH_TEMP_DATA,
  DELETE_TEMP_DATA
} from './type';

export const fetchCategories = () => dispatch => {
    fetch('http://localhost:3200/category')
         .then(response => response.json())
         .then(category => dispatch({
           type: FETCH_PRODUCT_CATEGORY,
           payload: category,
         })
       );
};

export const fetchProducts = id => dispatch => {
  fetch('http://localhost:3200/products', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      category_id: id,
    })
  })
    .then(res => res.json())
    .then(products =>
      dispatch({
        type: FETCH_PRODUCTS_BY_CATEGORY,
        payload: products,
      })
    );
};

export const fetchTempSections = id => dispatch => {
  fetch('http://localhost:3200/default_temp', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      category_id: id,
    })
  })
    .then(res => res.json())
    .then(sections =>
      dispatch({
        type: FETCH_DEFAULT_TEMPLATE_SECTIONS,
        payload: sections,
      })
    );
};

export const addTempSection = new_section => dispatch => {
  dispatch({
    type: ADD_NEW_TEMPLATE_SECTION,
    payload: new_section,
  })
};

  export const updateTempSection = section => dispatch => {
    dispatch({
      type: UPDATE_TEMPLATE_SECTION,
      payload: section,
    })
  };


  export const fetchTempData = data => dispatch => {
    dispatch({
      type: FETCH_TEMP_DATA,
      payload: data,
    })
  };
  export const updateTempData = data => dispatch => {

    dispatch({
      type: UPDATE_TEMP_DATA,
      payload: data,
    })
  };

  export const deleteTempData = (category,section,value,field, index) => dispatch => {
    dispatch({
      type: DELETE_TEMP_DATA,
      category,
      section,
      field,
      value,
      index
    })
  };
