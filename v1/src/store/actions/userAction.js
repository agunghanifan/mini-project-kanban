const kanbanAPI = 'https://todos-project-api.herokuapp.com'

export function setIsLogin (payload) {
  return { type: 'isLogin/setIsLogin', payload}
}

export function setLoading (payload) {
  return { type: 'loading/setLoading', payload}
}

export function setError (payload) {
  return { type: 'error/setError', payload}
}


export function setLogin (payload) {
  return (dispatch) => {
    dispatch(setLoading(true))
    fetch(kanbanAPI + '/auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setLoading(false))
        if (data.auth_token) {
          dispatch(setError(null))
          localStorage.setItem('auth_token', data.auth_token)
          dispatch(setIsLogin(true))
        } else {
          dispatch(setIsLogin(false))
          dispatch(setError(data.message))
        }
      })
      .catch(error => dispatch(setError(error)))
  }
}
