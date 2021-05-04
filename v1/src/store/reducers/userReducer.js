const initialState = {
    isLogin: null,
    loading: false,
    error: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'loading/setLoading':
      return { ...state, loading: action.payload}
    case 'error/setError':
      return { ...state, error: action.payload}
    case 'isLogin/setIsLogin':
      return { ...state, isLogin: action.payload}
    default:
      return state
  }
}

export default reducer