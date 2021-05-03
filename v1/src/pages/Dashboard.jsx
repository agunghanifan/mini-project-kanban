import React from 'react'
import { logoutSvg } from '../assets/'

export default function Dashboard() {
  
  function logOut(e) {
    e.preventDefault()
    console.log("sudah logout")
  }
  return (
    <div>
      <h1>Hello ini dashboard</h1>
      <div>
        <button onClick={e => logOut(e)}>Logout <img src={logoutSvg} alt="logout" /></button>
      </div>
    </div>
  )
}
