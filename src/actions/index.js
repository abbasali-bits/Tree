export const login = (emailId,name,tokenId) => {
	return {
		type: 'SIGN_IN',
		payload: {
          emailId: emailId,
          name : name,
          tokenId: tokenId
        }
	};
};
export const logoutAction = (emailId,name) => {
	return {
		type: 'SIGN_OUT',
		payload: {
          emailId: emailId,
          name : name
        }
	};
};

export const updateCurrentNodeIndex = (index) => {
	return {
		type: 'UPDATE',
		payload: {
          index: index
        }
	};
};