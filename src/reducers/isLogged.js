const loggedReducer = (state = {isLoggedIn: false}, action) => {
	switch(action.type){
		case 'SIGN_IN':
			return {
				emailId: action.payload.emailId,
				name : action.payload.name,
				isLoggedIn: true
			};
		case 'SIGN_OUT':
			return {
				emailId: action.payload.emailId,
				isLoggedIn: false
			};
		
		default :
			return state;
	}
}
export default loggedReducer; 