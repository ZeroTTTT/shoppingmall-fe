import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
const loginWithToken = () => async (dispatch) => {
  try{
    dispatch({type:types.LOGIN_WITH_TOKEN_REQUEST})
    const response = await api.get('/user/me')
    if(response.status!==200) throw new Error(response.error)
    dispatch({type:types.LOGIN_WITH_TOKEN_SUCCESS, payload: response.data})
  } catch(error) {
    dispatch({type:types.LOGIN_WITH_TOKEN_FAIL, payload:error})
    dispatch(logout()) //어차피 토큰이 잘못된거니까 토큰이랑 유저정보를 지워주자
  }
};
const loginWithEmail = ({email, password}) => async (dispatch) => {
  try{
    dispatch({type:types.LOGIN_REQUEST})
    const response = await api.post('/auth/login',{email, password})
    if (response.status !== 200) throw new Error(response.error)
    sessionStorage.setItem('token', response.data.token)
    dispatch({type:types.LOGIN_SUCCESS, payload:response.data})
  }catch(error){
    dispatch({type:types.LOGIN_FAIL, payload:error.error})
  }
};

const logout = () => async (dispatch) => {
  //user정보를 지우고
  dispatch({type:types.LOGOUT});
  //session token의 값을 지운다
  sessionStorage.removeItem('token');
};

const loginWithGoogle = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const response = await api.post("/auth/google", { token });
    if (response.status !== 200) {
      throw new Error(response.status, ", ", response.error);
    }
    sessionStorage.setItem("token", response.data.token);
    dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
    dispatch(
      commonUiActions.showToastMessage("로그인을 완료했습니다.", "success")
    );
  } catch (err) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const registerUser =
  ({ email, name, password }, navigate) =>
  async (dispatch) => {
    try{
      dispatch({type: types.REGISTER_USER_REQUEST});
      const response = await api.post('/user', {email, name, password});
      if (response.status !== 200) throw new Error(response.error);
      dispatch({type: types.REGISTER_USER_SUCCESS});
      dispatch(commonUiActions.showToastMessage('회원가입을 완료 했습니다!','success'))
      navigate(('/login'))
    }catch(error){
      dispatch({type: types.REGISTER_USER_FAIL, payload: error.error})
    }

  };
export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};
