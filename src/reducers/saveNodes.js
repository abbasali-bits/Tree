const nodesReducer = (state = {nodes: []} , action) => {
	switch(action.type){
		case 'SAVE':
			return {
				nodes : action.payload.nodes,
				isLoaded: action.payload.isLoaded
			};
		default :
			return state;
	}
}
export default nodesReducer; 