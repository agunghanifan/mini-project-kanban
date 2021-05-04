const herokuAPI = 'https://todos-project-api.herokuapp.com'
let token = localStorage.getItem('auth_token')
let bearer = 'BEARER ' + token

export function setError (payload) {
  return { type: 'error/setError', payload}
}

export function setLoading (payload) {
  return { type: 'loading/setLoading', payload}
}

export function setListTodos (payload) {
  return { type: 'listTodos/setListTodos', payload }
}

export function setListItems (payload) {
  return { type: 'listItems/setListItems', payload }
}

export function fetchListTodos () {
  return (dispatch) => {
    dispatch(setLoading(true))
    fetch(herokuAPI + '/todos', {
      method: 'GET',
      withCredentials: true,
      // credentials: 'include',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setLoading(false))
        console.log(data)
        dispatch(setListTodos(data))
      })
      .catch(error => {
        console.log(error)
        dispatch(setError(error))
      })
  }
}
