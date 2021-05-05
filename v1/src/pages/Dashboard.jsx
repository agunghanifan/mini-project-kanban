import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../store/actions/userAction'
import { fetchListTodos } from '../store/actions/taskAction'
import { useHistory } from 'react-router-dom'
import { CardTodos } from '../components/'
import { logoSvg } from '../assets/'
import './css/Dashboard.css'

export default function Dashboard() {
  const isLogin = useSelector(state => state.userReducer.isLogin)
  const listTodos = useSelector(state => state.taskReducer.listTodos)
  const loading = useSelector(state => state.taskReducer.loading)
  const error = useSelector(state => state.taskReducer.error)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!localStorage.getItem('auth_token')) {
      history.push('/')
    }
  }, [isLogin, history])

  useEffect(() => {
    dispatch(setLogin({ email: 'tony@stark.com', password: 'password'}))
    const timing = setInterval(() => {
      dispatch(fetchListTodos())
      clearInterval(timing)
    }, 3000);
  }, [dispatch])

  return (
    <div className="container-fluid d-flex vh-100">
      <div className="row d-flex align-items-stretch align-content-stretch flex-fill">
        <div className="col-1 bg-dark align-self-stretch">
          <img className="m-3 align-self-center" src={logoSvg} alt="logo" />
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
          </div>
        </div>
      </div>
    </div>
  )
}
