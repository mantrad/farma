export const Web3Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT':
      return {
        ...state,
        account: action.payload
      };
    case 'SET_PROVIDER':
      return {
        ...state,
        provider: action.payload
      };
    case 'SET_PROJECTSTATS':
      return {
        ...state,
        projectStats: action.payload
      };
    default:
      return state;
  }
};
