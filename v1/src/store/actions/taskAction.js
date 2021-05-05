const herokuAPI = 'https://todos-project-api.herokuapp.com'
let token = localStorage.getItem('auth_token') || null
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
        dispatch(setError(null))
        dispatch(setListTodos(data))
      })
      .catch(error => {
        console.log(error)
        dispatch(setError(error))
      })
      .finally(_ => dispatch(setLoading(false)))
  }
}

export function fetchListItems (payload) {
  return (dispatch) => {
    dispatch(setListItems([]))
    dispatch(setLoading(true))
    fetch(herokuAPI + `/todos/${payload}/items`, {
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
        dispatch(setError(null))
        dispatch(setListItems(data))
      })
      .catch(error => {
        dispatch(setError(error))
        console.log(error)
      })
      .finally(_ => dispatch(setLoading(false)))
  }
}

export function setAddList (payload) {
  return (dispatch) => {
    const { task, id } = payload
    dispatch(setLoading(true))
    fetch(herokuAPI + `/todos/${id}/items`, {
      method: 'POST',
      withCredentials: true,
      // credentials: 'include',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => setError(error))
      .finally(_ => dispatch(setLoading(false)))
    
  }
}
