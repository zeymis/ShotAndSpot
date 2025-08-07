import React, { useState } from "react";
import './SignUp.css'

function SignUp({ onSignUpComplete, onBack, showSignup }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSignUp = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                setMessage('Sign Up Successful')
                onSignUpComplete()
            }

            else {
                setMessage(data.error || 'Sign Up Not Successful')
            }
        }

        catch (error) {
            setMessage('Server Error')
        }
    }

    return (
    <div className="signup-container">
        <div className={`signup-box ${showSignup ? "fade-in" : "fade-out"}`}>
        <h2 className="signup-title">sign up</h2>
        <form onSubmit={handleSignUp} className="signup-form">
            <label className='signup-label'>email:</label>
            <input
                type="email"
                className='signup-input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label className="signup-label">password:</label>
            <input
                type="password"
                className="signup-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <div className='signup-buttons'>
              <button type="button" onClick={onBack} className='button-style'>back</button>
              <button type="submit" className='button-style button-submit'>sign up</button>
            </div>

            {message && (
            <p style={{ color: message.includes('Successful') ? "green" : "red", marginTop: '1rem' }}>
                {message}
            </p>
            )}
        </form>
        </div>
    </div>
    )
}

export default SignUp