import React, { useState, useEffect } from 'react'
import './infoUser.css'
import Logout from '../Logout/Logout'

function ProfilePage({ handleLogout }) {
  const [userData, setUserData] = useState(null);

  const updateUserData = () => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  };

  // Llamar a la función updateUserData cuando el componente se monte
  useEffect(() => {
    updateUserData();
  }, []);

  useEffect(() => {
    const formRegisterContain = document.querySelector('.form-register-contain ');
    if (userData) {
      formRegisterContain.style.display = 'none';
    } else {
      formRegisterContain.style.display = 'flex';
    }
  }, [userData]);

  useEffect(() => {
    const loginText = document.querySelector('.loginText');
    if (userData) {
      loginText.style.display = 'none';
    } else {
      loginText.style.display = 'block';
    }
  }, [userData]);



  // Actualizar el estado de userData cuando el usuario inicie sesión
  const handleLogin = () => {
    updateUserData();
  };

  return (
    <div className='userInfoContainer'>
      {userData ? (
        <div className='userInfo'>
          <h1>Welcome, <span>{userData.name}</span>!</h1>
          <img src={userData.photo} alt="User Avatar" />
          <p>Email: {userData.mail}</p>
          <Logout onClick={handleLogout} />
        </div>
      ) : (
        <p className='loginText'>Inicia sesión para ver tu perfil</p>
      )}
    </div>
  );
}

export default ProfilePage;