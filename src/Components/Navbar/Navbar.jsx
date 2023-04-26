import React, { useState, useEffect } from 'react'
import './Navbar.css'

import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import LogIn from '../LogIn/LogIn';
import Register from '../Register/Register';
import UserInfo from '../InfoUser/InfoUser';
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false);
    let [modalUser, setModalUser] = useState(false);
    let [modalUserOption, setModalUserOption] = useState('login');
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    const handleModalUser = () => {
        setModalUser(!modalUser);
    }; //Funcion renderiza Modal 'user'
    const handleModalUserOption = () => {
        setModalUserOption(modalUserOption === 'register' ? 'login' : 'register');
    }; //Funcion renderiza el modal 'register' o 'login'



    return (
        <header>
            <nav className={scrolled ? "navbar scrolled" : "navbar"}>
                <div className='logo'>
                    <img src="../../../img/logo2.png" alt="logo" />
                </div>
                <div className='logo2'>
                    <img src="../../../img/logo1.png" alt="logo" />
                </div>

                <div className={`nav_items ${isOpen && "open"}`} >

                    <div className="cerrar-nav" onClick={() => setIsOpen(!isOpen)}>
                        x
                    </div>

                    <div className='logo-nav'>
                        <img src="../../../img/logo1.png" alt="logo" />
                    </div>


                    <div>
                        <div className='icons-nav2'>

                            <FontAwesomeIcon icon={faUser} onClick={handleModalUser} />
                        </div>
                        <div className='enlaces'>
                            <Anchor to={`/`} >Inicio</Anchor>
                            <Anchor to={`/`} >Blog</Anchor>
                            <Anchor to={`/`} >Tols</Anchor>
                            <Anchor to={`/`} >Docs</Anchor>
                        </div>
                        <div className="redes-sociales">
                            <Anchor to={`https://www.instagram.com/juan_rivera_de_ellas/`}><i className='fa fa-instagram'></i></Anchor>
                            <Anchor to={`https://www.linkedin.com/in/juan-rivera-9ba866215/`}> <i className='fa fa-linkedin'></i></Anchor>
                            <Anchor to={`https://github.com/RIVERA-PRO`}> <i className='fa fa-github'></i></Anchor>
                        </div>

                    </div>

                </div>
                <div className='icons-nav'>

                    <FontAwesomeIcon icon={faUser} onClick={handleModalUser} />
                </div>


                <div className={`nav_toggle  ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className="redes-sociales1">
                    <Anchor to={`https://www.linkedin.com/in/juan-rivera-9ba866215/`}> <i className='fa fa-linkedin'></i></Anchor>
                    <Anchor to={`https://github.com/RIVERA-PRO`}> <i className='fa fa-github'></i></Anchor>
                </div>


                {modalUser && (
                    <div className="modal_content">
                        <div className="modal-nav">
                            <div className="cerrar-modal" onClick={handleModalUser}>x</div>

                            <UserInfo />
                            {modalUserOption === 'register' ? <Register /> : <LogIn />}
                            <p className='loginText'>{modalUserOption === 'register' ? '¿Ya tienes una cuenta? ' : '¿No tienes una cuenta? '}
                                <Anchor id='login' onClick={handleModalUserOption}>
                                    {modalUserOption === 'register' ? 'Ingresar' : 'Registrarse'}
                                </Anchor>
                            </p>

                        </div>
                    </div>
                )}
            </nav>


        </header>
    );
}
