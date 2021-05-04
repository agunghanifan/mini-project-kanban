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

export function setRegister (payload) {
  return (dispatch) => {
    dispatch(setLoading(true))
    fetch(kanbanAPI + '/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setLoading(false))
        if (data.message[0] !== 'A') {
          dispatch(setError(data.message))
        } else {
          dispatch(setError(null))
        } 
      })
      .catch(error => dispatch(setError(error)))
  }
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
        console.log(data)
        if (data.auth_token) {
          dispatch(setError(null))
          localStorage.setItem('auth_token', data.auth_token)
          dispatch(setIsLogin(true))
          console.log("masuk data localstorage")
        } else {
          dispatch(setIsLogin(false))
          dispatch(setError(data.message))
        }
      })
      .catch(error => dispatch(setError(error)))
  }
}

export function setLogout () {
  return (dispatch) => {
    localStorage.removeItem('auth_token')
    dispatch(setError(null))
  }
}
