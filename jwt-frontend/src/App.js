import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import Photo from './Photo.jsx'
import './Welcome.css'
import './Login.css'


import React, { useState } from 'react'
import { tr } from 'framer-motion/client'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"))
  const [currentPage, setCurrentPage] = useState("welcome")
  const [animateText, setAnimateText] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)



  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token)
    setIsLoggedIn(true)
    handleLoginPhotoClick()
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setShowLogin(false) // önce fade-out başlasın
    setShowSignup(false)
    setAnimateText(false)
    setTimeout(() => {
      setCurrentPage("welcome") // sonra login component'ını DOM'dan kaldır
    }, 1000) // fade-out süresiyle aynı olmalı
  }


  const handleLoginClick = () => {
    setAnimateText(true)
    setShowLogin(true)
    setTimeout(() => {
      setCurrentPage("login")
    }, 1000)
  }

  const handleSignupClick = () => {
    setAnimateText(true)
    setShowSignup(true)
    setTimeout(() => {
      setCurrentPage("signup")
    }, 1000)
  }

  const handleLoginPhotoClick = () => {
    setAnimateText(true)
    setShowPhoto(true)
    setTimeout(() => {
      setCurrentPage("photo")
    }, 1000)
  }

  const handleBackToWelcome = () => {
    setShowLogin(false) // önce fade-out başlasın
    setShowSignup(false)
    setTimeout(() => {
      setCurrentPage("welcome") // sonra login component'ını DOM'dan kaldır
      setTimeout(() => {
            setAnimateText(false)
      }, 50)
    }, 500) // fade-out süresiyle aynı olmalı
  }

  

  return (
    <div className="welcome-container">
      <h4 className={`welcome-title ${animateText ? "fade-out" : "fade-in"}`}>
        welcome to the
      </h4>
      <h1 className={`logo-text ${animateText ? "slide-up" : "slide-down"}`}>
        shot & spot
      </h1>

      {currentPage === "welcome" && (
        <div className="button-container">
          <button className="welcome-button" onClick={handleLoginClick}>log in</button>
          <button className="welcome-button" onClick={handleSignupClick}>sign up</button>
        </div>
      )}

      {currentPage === "login" && (
        <div>
          <Login 
            onLoginSuccess={handleLoginSuccess} 
            onBack={handleBackToWelcome} 
            showLogin={showLogin} 
            setShowLogin={setShowLogin} 
            handleLoginClick={handleLoginClick}
          />
        </div>
      )}

      {currentPage === "signup" && (
        <div>
          <SignUp onSignUpComplete={handleBackToWelcome} onBack={handleBackToWelcome} showSignup={showSignup} setShowSignup={setShowSignup} handleLoginSuccess={handleLoginSuccess}/>
        </div>
      )}

      {isLoggedIn && currentPage === "photo" && (
        <div>
          <Photo onLogOut={handleLogout} handleLoginPhotoClick={handleLoginPhotoClick} showPhoto={showPhoto} setShowPhoto={setShowPhoto}/>
        </div>

      )}
    </div>
  )


}
  
export default App;
