const initialState = {
    auth_token: '',
    loading: false,
    error: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'loading/setLoading':
      return { ...state, loading: action.payload}
    case 'error/setError':
      return { ...state, error: action.payload}
    case 'auth_token/setAuthToken':
      return { ...state, auth_token: action.payload}
    default:
      return state
  }
}

export default reducer