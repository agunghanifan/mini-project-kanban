import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout, setIsLogin } from '../store/actions/userAction'
import { fetchListTodos } from '../store/actions/taskAction'
import { useHistory } from 'react-router-dom'
import { logoutSvg } from '../assets/'

export default function Dashboard() {
  const isLogin = useSelector(state => state.userReducer.isLogin)
  const listTodos = useSelector(state => state.taskReducer.listTodos)
  const loading = useSelector(state => state.taskReducer.loading)
  const error = useSelector(state => state.taskReducer.error)
  const dispatch = useDispatch()
  const history = useHistory()

  function logOut(e) {
    e.preventDefault()
    console.log("sudah logout")
    dispatch(setLogout())
    dispatch(setIsLogin(false))
  }

  useEffect(() => {
    if (!localStorage.getItem('auth_token')) {
      history.push('/')
    }
  }, [isLogin, history])

  useEffect(() => {
    dispatch(fetchListTodos())
  }, [dispatch])

  return (
    <div>
      <h1>Hello ini dashboard</h1>
      <div>
        {
          loading ? <h1>Please wait...</h1> :
          error ? <h1>Heres some error we founded {JSON.stringify(error)}</h1> :
          <p>{JSON.stringify(listTodos)}</p>
        }
        <button onClick={e => logOut(e)}>Logout <img src={logoutSvg} alt="logout" /></button>
      </div>
    </div>
  )
}
