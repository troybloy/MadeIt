import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout())
    history.push('/')
  };

  return (
  <div className="drop-nav-option" onClick={onLogout} title="Sign Out">Sign out</div>
  );
};

export default LogoutButton;
