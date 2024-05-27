import * as types from "../constants/user.constants";
const initialState = {
  loading:false,
  user: null,
  error: ''
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type){
      case types.REGISTER_USER_REQUEST:
      case types.LOGIN_REQUEST:
      case types.LOGIN_WITH_TOKEN_REQUEST:
        return {...state, loading:true}
      case types.LOGIN_SUCCESS:
      case types.LOGIN_WITH_TOKEN_SUCCESS:
        return {...state, loading:false, user: payload.user}
      case types.LOGIN_FAIL:
      case types.REGISTER_USER_FAIL:
        return {...state, loading: false, error: payload}
      case types.LOGIN_WITH_TOKEN_FAIL:
        return {...state, loading: false} //굳이 에러를 보여주지않고 로그아웃상태로 만들면되니까 에러는 빼자
      case types.LOGOUT:
        return {...state, user:null}
    default:
      return state;
  }

}

export default userReducer;
