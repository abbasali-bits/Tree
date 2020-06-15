const loggedReducer = (state = {isLoggedIn: false}, action) => {
	switch(action.type){
		case 'SIGN_IN':
			return {
				emailId: action.payload.emailId,
				name : action.payload.name,
				tokenId: action.payload.tokenId,
				isLoggedIn: true
			};
		case 'SIGN_OUT':
			return {
				emailId: action.payload.emailId,
				name : action.payload.name,
				tokenId: '',
				isLoggedIn: false
			};
		default :
			return state;
	}
}
export default loggedReducer; 