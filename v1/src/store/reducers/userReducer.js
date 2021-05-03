const initialState = {
    auth_token: '',
    loading: false,
    error: null
}

function reducer(state = initialState, action) {
    const { type, payload } = action
    return state
}

export default reducer