const currentNodeReducer = (state = {index: 1}, action) => {
	switch(action.type){
		case 'UPDATE':
			return {
				index: action.payload.index,
			};
		default :
			return state;
	}
}
export default currentNodeReducer; 