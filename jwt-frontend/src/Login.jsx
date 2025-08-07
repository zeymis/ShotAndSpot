import React, { useState } from 'react'
import './Login.jsx'
import { animate } from 'framer-motion'

function Login({ onLoginSuccess, onBack, showLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
          e.preventDefault()

          const url = 'http://localhost:8080/api/auth/login'

          try {
            const response = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
              setMessage('Login Not Successful')
              return
            }

            if (data.error) {
              setMessage('Login Not Successful: ' + data.error)
              return
            }

            setMessage('Login Successful. Token Received')
            localStorage.setItem('token', data.token)

            if (onLoginSuccess) {
              onLoginSuccess(data.token)
            }
          }

          catch (error) {
            setMessage('Server Error')
          }       
    }
    
    return (
      <div className="login-container">
        <div className={`login-box ${showLogin ? "fade-in" : "fade-out"}`}>
          <h2 className='login-title'>log in</h2>
          <form onSubmit={handleSubmit} className='login-form'>
            <label className='login-label'>email:</label>
            <input
              type="email"
              className='login-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className='login-label'>password:</label>
            <input
              type="password"
              className='login-input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className='login-buttons'>
              <button type="button" onClick={onBack} className='button-style'>back</button>
              <button type="submit" className="button-style button-submit">log in</button>
            </div>

            {message && (
              <p style={{ color: message.includes('Successful') ? "green" : "red" }}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    )
}

export default Login