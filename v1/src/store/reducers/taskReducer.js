const initialState = {
    listTodos: [],
    listItems: [],
    loading: false,
    error: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'loading/setLoading':
      return { ...state, loading: action.payload}
    case 'error/setError':
      return { ...state, error: action.payload}
    case 'listTodos/setListTodos':
      return { ...state, listTodos: action.payload}
    case 'listItems/setListItems':
      return { ...state, listItems: [...state.listItems, action.payload]}
    default:
      return state
  }
}

export default reducer