import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";
import Spiral from "../Spiral/Spiral";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlane, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import alertActions from "../../Store/Alert/actions";
import { useDispatch } from "react-redux";

const { open } = alertActions;


export default function Detail() {
    let dispatch = useDispatch();
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [carrito, setCarrito] = useState([]);
    const [showLightbox, setShowLightbox] = useState(false);
    const [showLightbox2, setShowLightbox2] = useState(false);
    const [showLightbox3, setShowLightbox3] = useState(false);



    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }

    useEffect(() => {
        fetch(`http://localhost:8080/destinos/${id}`, headers)
            .then((response) => response.json())
            .then((data) => {
                setProducto(data.destino);
                console.log(data.destino)
            });
    }, [id]);





    useEffect(() => {
        const cart = localStorage.getItem('carrito');
        if (cart) {
            setCarrito(JSON.parse(cart));
        }
    }, []);





    if (!producto) {
        return (
            <div className="espiral-contain">
                <Spiral />
            </div>
        );
    }

    return (
        <div className="contain-detail">
            <h3>Destination details</h3>
            <div className="detail-contain">
                <div className="img-detail">
                    <img
                        src={producto.cover_photo}
                        alt={producto.title}
                        onClick={() => setShowLightbox(true)}
                    />


                </div>

                <div className="text-detail">

                    <h3>{producto.title}</h3>

                    <p className="descripcion">{producto.description}</p>
                </div>
            </div>


        </div >
    );
}
