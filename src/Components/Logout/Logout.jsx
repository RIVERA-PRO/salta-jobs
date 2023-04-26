import React from 'react';
import './logout.css'
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import alertActions from "../../Store/Alert/actions"

const { open } = alertActions;

export default function LogoutButton() {
  let dispatch = useDispatch();
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('carrito');
    setInterval(() => window.location.href = '/')
    let dataAlert = {
      icon: "success",
      title: "Log Out Successful",
      type: "toast"
    };
    dispatch(open(dataAlert));
  }

  return (
    <button className='logoutBtn' onClick={handleLogout}>Logout</button>
  )
}
