import * as types from '../constants/cart.constants';

const initialState = {
	isFirst: true,
};

function bannerReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case 'SET_FIRST_MAIN':
			return { isFirst: payload };
		default:
			return { ...state };
	}
}
export default bannerReducer;
