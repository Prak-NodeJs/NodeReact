import React, { useState, useEffect } from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('user')
    if (auth) {
      navigate('/')
    }
  })

  const collectData = async () => {
    console.log(name, email, password)
    const result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const results = await result.json()
    console.log(results)

    localStorage.setItem('user', JSON.stringify(results.result))
    localStorage.setItem('token', JSON.stringify(results.auth))

    navigate('/')

    setEmail('')
    setName('')
    setPassword('')
  }

  return (
    <div className="form">
      <h1>Register</h1>
      <input
        className="input-box"
        type="text"
        placeholder="enter name"
        onChange={(e) => {
          setName(e.target.value)
        }}
        value={name}
      />
      <input
        className="input-box"
        type="text"
        placeholder="enter email"
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        value={email}
      />

      <input
        className="input-box"
        type="password"
        placeholder="enter passsword"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        value={password}
      />
      <button onClick={collectData} type="button" className="signupbtn">
        SignUp
      </button>
    </div>
  )
}
export default SignUp
