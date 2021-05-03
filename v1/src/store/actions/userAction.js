const kanbanAPI = 'https://todos-project-api.herokuapp.com'

export function setAuthToken (payload) {
  return { type: 'auth_token/setAuthToken', payload}
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
          alert('Success', data.message)
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
      })
      .catch(error => dispatch(setError(error)))
  }
}
