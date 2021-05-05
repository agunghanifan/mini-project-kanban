import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout, setIsLogin } from '../store/actions/userAction'
import { fetchListTodos } from '../store/actions/taskAction'
import { useHistory } from 'react-router-dom'
import { CardTodos } from '../components/'
import { logoutSvg, logoSvg } from '../assets/'
import './css/Dashboard.css'

export default function Dashboard() {
  const isLogin = useSelector(state => state.userReducer.isLogin)
  const listTodos = useSelector(state => state.taskReducer.listTodos)
  const loading = useSelector(state => state.taskReducer.loading)
  const error = useSelector(state => state.taskReducer.error)
  const history = useHistory()
  const dispatch = useDispatch()
  const [listIdTodos, setListIdTodos] = useState([])

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
    <div className="container-fluid full-height">
      <div className="row align-items-stretch">
        <div className="col-1 bg-dark">
          <img className="m-3" src={logoSvg} alt="logo" />
        </div>
        <div className="col">
          <div className="row m-2">
            <div className="col">
              <h3 style={{fontSize: "20px"}}>Product Roadmap</h3>
              <div className="row">
                {
                  loading ? <h1>Please wait...</h1> :
                  error ? <h1>Heres some error we founded {JSON.stringify(error)}</h1> :
                  listTodos.map(todo => {
                    return <CardTodos id={listTodos} todo={todo} key={todo.id} />
                  })
                }
              </div>
            </div>
            <div className="col-1">
              <button className="btn btn-danger" onClick={e => logOut(e)}>Logout <img className="fs-6" src={logoutSvg} alt="logout" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
