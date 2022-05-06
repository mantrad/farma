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
    case 'SET_USERSTATS':
      return {
        ...state,
        userStats: action.payload
      };
    case 'SET_BALANCE':
      return {
        ...state,
        Balance: action.payload
      };
    case 'SET_POWER':
      return {
        ...state,
        Power: action.payload
      };
    case 'SET_INSTANCE':
      return {
        ...state,
        Instance: action.payload
      };
    default:
      return state;
  }
};
