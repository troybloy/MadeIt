import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton'
import './NavBar.css'

const DropNav = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state?.session?.user)
  const history = useHistory()
  const [showDropNav, setShowDropNav] = useState(false)

  const openDropNav = () => {
    if (showDropNav) return
    setShowDropNav(true)
  }

  useEffect(() => {
    if (!showDropNav) return

    const closeDropNav = () => {
      setShowDropNav(false)
    }

    document.addEventListener('click', closeDropNav)

    return () => document.removeEventListener('click', closeDropNav)
  }, [showDropNav])

  return (
    <div className='drop-nav'>
      <div className='drop-nav-button' onClick={openDropNav}>
        <i className='fa-solid fa-bars profile_icon' />
        <i className='fa-solid fa-user profile_icon' />
      </div>
      {showDropNav && (
        <div className='drop-nav-open'>
          <div className='drop-nav-name'>
            <i className='fas fa-user-circle' />
            {sessionUser?.first_name}
          </div>
          <div className='drop-nav-option'>
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  )
}

export default DropNav
