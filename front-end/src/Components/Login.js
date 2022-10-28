import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUp.css'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('user')
    if (auth) {
      navigate('/')
    }
  })

  const loginCheck = async () => {
    let result = await fetch('http://localhost:5000/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const results = await result.json()
    console.log(results)

    if (results.auth) {
      localStorage.setItem('user', JSON.stringify(results.user))
      localStorage.setItem('token', JSON.stringify(results.auth))
      navigate('/')
    }
  }

  return (
    <div className="form">
      <h1>Login</h1>
      <input
        className="input-box"
        type="text"
        placeholder="enter email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      <input
        className="input-box"
        type="password"
        placeholder="enter password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />

      <button onClick={loginCheck} type="button" className="signupbtn">
        Login
      </button>
    </div>
  )
}

export default Login
