import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../store/actions/userAction'
import { mailSvg, passwordSvg } from '../assets/'
import './css/Login.css'


export default function Login() {

  let isLogin = useSelector(state => state.userReducer.isLogin)
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: ''
  })
  const dispatch = useDispatch()
  const history = useHistory()

  function onChange (e) {
    let { name, value } = e.target
    const newInput = { ...loginInput, [name]: value }
    setLoginInput(newInput)
  }

  function login (e) {
    e.preventDefault()
    dispatch(setLogin(loginInput))
  }

  useEffect(() => {
    if (isLogin === true) {
      history.push('/v1/dashboard')
    } else if (!isLogin === false) {
      alert('Username / Password is wrong!')
      history.push('/')
    }
  }, [isLogin, history])

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      history.push('/v1/dashboard')
    }
  }, [history])

  return (
    <div className='container'>
      <h1>Hello ini Login page</h1>
      <div className='login-box'>
        <form onSubmit={e => login(e)}>
          <img src={mailSvg} alt="mail" />
          <input type="email" value={loginInput.email} onChange={onChange} name='email' placeholder='email...' required></input>
          <img src={passwordSvg} alt="password" />
          <input type="password" value={loginInput.password} onChange={onChange} name='password' placeholder='password...' required></input>
          <button type='submit'>Login</button>
        </form>
        <Link to='/v1/register'>Don't have an account?</Link>
      </div>
    </div>
  )
}
