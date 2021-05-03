import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { mailSvg, passwordSvg } from '../assets/'
import './css/Login.css'


export default function Login() {

  const [loginInput, setLoginInput] = useState({
    email: '',
    password: ''
  })

  function onChange (e) {
    let { name, value } = e.target
    const newInput = { ...loginInput, [name]: value }
    setLoginInput(newInput)
  }

  function login (e) {
    e.preventDefault()
    console.log(loginInput)
    alert('login success')
    setLoginInput({
      email: '',
      password: ''
    })
  }
  return (
    <div className='container'>
      <h1>Hello ini Login page</h1>
      <div className='login-box'>
        <form>
          <img src={mailSvg} alt="mail" />
          <input type="email" value={loginInput.email} onChange={onChange} name='email' placeholder='email...'></input>
          <img src={passwordSvg} alt="password" />
          <input type="password" value={loginInput.password} onChange={onChange} name='password' placeholder='password...'></input>
          <button type='submit' onClick={e => login(e)}>Login</button>
        </form>
        <Link to='/v1/register'>Don't have an account?</Link>
      </div>
    </div>
  )
}
