import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";
const addToCart =
  ({ id, size }) =>
  async (dispatch) => {
    try{
      dispatch({type:types.ADD_TO_CART_REQUEST});
      const response = await api.post('/cart', {productId:id, size, qty:1})
      if (response.status !== 200) throw new Error(response.error);
      dispatch({  
        type: types.ADD_TO_CART_SUCCESS,
        payload: response.data.cartItemQty
      });
      dispatch(commonUiActions.showToastMessage('카트에 상품이 추가됐습니다.','success'));
    } catch (error) {
      dispatch({ type: types.ADD_TO_CART_FAIL, payload: error.error });
      dispatch(commonUiActions.showToastMessage(error.error, "error"));
    }
  };

  const getCartList = () => async (dispatch) => {
    try {
      dispatch({ type: types.GET_CART_LIST_REQUEST });
      const response = await api.get("/cart");
  
      if (response.status !== 200) {
        throw new Error(response.error);
      }
  
      dispatch({
        type: types.GET_CART_LIST_SUCCESS,
        payload: response.data.data,
      });
    } catch (err) {
      dispatch({ type: types.GET_CART_LIST_FAIL, payload: err.error });
    }
  };


const deleteCartItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
    const response = await api.delete(`/cart/${id}`);
    if (response.status !== 200) throw new Error(response.error);

    dispatch({
      type: types.DELETE_CART_ITEM_SUCCESS,
      payload: response.data.cartItemQty,
    });
    dispatch(getCartList());
  } catch (error) {
    dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};

const updateQty = (id, value) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });
    const response = await api.put(`/cart/${id}`, value);
    if (response.status !== 200) {
      throw new Error(response.error);
    }

    dispatch({
      type: types.UPDATE_CART_ITEM_SUCCESS,
      payload: response.data.data,
    });
    dispatch(
      commonUiActions.showToastMessage("상품 정보가 수정되었습니다.", "success")
    );
    dispatch(getCartList());
  } catch (err) {
    dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};
const getCartQty = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_QTY_REQUEST });
    const response = await api.get("/cart/qty");

    if (response.status !== 200) {
      throw new Error(response.error);
    }
    dispatch({ type: types.GET_CART_QTY_SUCCESS, payload: response.data.qty });
  } catch (err) {
    dispatch({ type: types.GET_CART_QTY_FAIL, payload: err.error });
  }
};


export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
