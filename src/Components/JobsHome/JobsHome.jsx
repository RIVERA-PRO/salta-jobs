import React, { useState, useEffect } from "react";
import Spiral from "../Spiral/Spiral";
import { Link as Anchor } from "react-router-dom";
import "./JobsHome.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
export default function JobsHome() {
    const [destinos, setDestinos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedDestino, setSelectedDestino] = useState(null);
    const [categoria, setCategoria] = useState("");
    const categoriasUnicas = [...new Set(destinos.map((destino) => destino.categoria))];
    const [salario, setSalario] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [lugar, setLugar] = useState("");

    const date = new Date(selectedDestino?.createdAt);
    const hour = date.getHours();
    const minutes = date.getMinutes();

    let token = localStorage.getItem("token");
    let headers = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetch("http://localhost:8080/destinos", headers)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.destino);
                setDestinos(data.destino);
                setIsLoading(false);
            });
    }, []);
    useEffect(() => {
        fetch("http://localhost:8080/destinos", headers)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.destino);
                setDestinos(data.destino);
                setIsLoading(false);
            });
    }, [salario]);
    useEffect(() => {
        const url = `http://localhost:8080/destinos?ubicacion=${ubicacion}`;
        fetch(url, headers)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.destino);
                setDestinos(data.destino);
                setIsLoading(false);
            });
    }, [ubicacion]);

    const handlePreviewClick = (destino) => {
        console.log("Mostrar vista previa para destino:", destino);
        setShowPreview(true);
        localStorage.setItem("selectedDestino", JSON.stringify(destino));
    }

    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user?.user_id;


    if (isLoading) {
        return (
            <div className="espiral-contain">
                <Spiral />
            </div>
        );
    } else {
        const filteredDestinos = destinos?.filter(
            (destino) =>
                destino?.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (categoria === "" || destino?.categoria === categoria) &&
                (salario === "" ||
                    (salario === "80000" && destino?.salario <= 80000) ||
                    (salario === "90000" &&
                        destino?.salario > 80000 &&
                        destino?.salario <= 90000) ||
                    (salario === "100000" &&
                        destino?.salario > 90000 &&
                        destino?.salario <= 200000) ||
                    (salario === "200000" &&
                        destino?.salario > 200000 &&
                        destino?.salario <= 200000) ||
                    (salario === "200000" && destino?.salario > 200000)) &&
                (ubicacion === "" || destino?.ubicacion === ubicacion) &&
                (lugar === "" || destino?.lugar === lugar)
        );




        return (
            <div className="contain-destinos">

                <div className="contain">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}

                        loop={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                        }}
                        pagination={{ el: '.swiper-pagination', clickable: true }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                            clickable: true,
                        }}
                        onSwiper={(swiper) => console.log(swiper)}
                        className="swiper_container"
                    >
                        <SwiperSlide> <div>

                            <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                <option value="">Categorias</option>
                                {categoriasUnicas.map((categoria) => (
                                    <option key={categoria} value={categoria}>
                                        {categoria}
                                    </option>
                                ))}
                            </select>
                        </div></SwiperSlide>
                        <SwiperSlide>  <div>
                            <select value={salario} onChange={(e) => setSalario(e.target.value)}>
                                <option value="">Salarios</option>
                                <option value="80000">$80000 o menos</option>
                                <option value="90000">$80000 - $90000</option>
                                <option value="100000">$90000 - $100000</option>
                                <option value="200000">$100000 - $200000</option>
                                <option value="200000">$200000 o más</option>
                            </select>
                        </div></SwiperSlide>
                        <SwiperSlide>  <div>
                            <select
                                value={ubicacion}
                                onChange={(e) => setUbicacion(e.target.value)}
                            >
                                <option value="">Departamentos</option>
                                <option value="Otros">Otros</option>
                                <option value="Salta">Salta</option>
                                <option value="Anta">Anta</option>
                                <option value="Cachi">Cachi</option>
                                <option value="Cafayate">Cafayate</option>
                                <option value="Cerrillos">Cerrillos</option>
                                <option value="Chicoana">Chicoana</option>
                                <option value="General Güemes">General Güemes</option>
                                <option value="Guachipas">Guachipas</option>
                                <option value="Iruya">Iruya</option>
                                <option value="La Caldera">La Caldera</option>
                                <option value="La Candelaria">La Candelaria</option>
                                <option value="La Poma">La Poma</option>
                                <option value="La Viña">La Viña</option>
                                <option value="Los Andes">Los Andes</option>
                                <option value="Metán">Metán</option>
                                <option value="Molinos">Molinos</option>
                                <option value="Orán">Orán</option>
                                <option value="Rivadavia">Rivadavia</option>
                                <option value="Rosario de la Frontera">Rosario de la Frontera</option>
                                <option value="Rosario de Lerma">Rosario de Lerma</option>
                                <option value="San Carlos">San Carlos</option>
                                <option value="San Martín">San Martín</option>
                                <option value="Santa Victoria">Santa Victoria</option>
                            </select>
                        </div></SwiperSlide>
                        <SwiperSlide> <div>

                            <select id="lugar" value={lugar} onChange={(e) => setLugar(e.target.value)}>
                                <option value="">Ubicaciones</option>
                                {destinos && [...new Set(destinos.map((destino) => destino.lugar))].map((lugar) => (
                                    <option key={lugar} value={lugar}>
                                        {lugar}
                                    </option>
                                ))}
                            </select>
                        </div></SwiperSlide>

                    </Swiper>

                    <div className="slider-controler">
                        <div className="swiper-button-prev slider-arrow">
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </div>
                        <div className="swiper-button-next slider-arrow">
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>



                </div>

                <div className="jobs-contain-total">

                    <div className="destinos-contain">
                        <div className="inputsearch">
                            <input
                                type="text"
                                placeholder="Buscar...."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="scrolll">
                            {filteredDestinos?.length > 0 ? (
                                filteredDestinos.map((destino) => (
                                    <div className="card-destinos" key={destino?._id}>
                                        <div>

                                            <div className="card-text">
                                                <h2 id="title-cardtext">{destino?.title.slice(0, 30)}..</h2>
                                                <div className="card-text-ubi-modal">
                                                    <h6>{destino?.ubicacion}, {destino?.lugar}</h6>
                                                    <div className="card-text-modalidad">
                                                        <p>{destino.modalidad}</p>
                                                    </div>
                                                </div>
                                                <div className="info-user-jobs">
                                                    <img className="info-user-img" src={destino?.photo} alt="" />
                                                    <div className="info-p">
                                                        <p>{destino?.name}</p>
                                                    </div>
                                                </div>
                                                <div className="price-link">

                                                    <button className="btn-preview" onClick={() => setSelectedDestino(destino) && handlePreviewClick()}>
                                                        Ver <FontAwesomeIcon icon={faSignOutAlt} />
                                                    </button>

                                                    <Anchor
                                                        className="btn-details"
                                                        to={`/details/${destino?._id}`}
                                                    >
                                                        Ver <FontAwesomeIcon icon={faSignOutAlt} />
                                                    </Anchor>
                                                    {destino.user_id === userId ? (
                                                        <Anchor
                                                            className="btn-detail"
                                                            to={`/edit/${destino?._id}`}
                                                        >
                                                            Edit
                                                        </Anchor>
                                                    ) : null}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="results-no-found">No hay resultados</p>
                            )}
                        </div>
                    </div>

                    <div className="destino-details-contain">

                        <div className="destino-details">
                            {selectedDestino ? (
                                <div className="jobs-contain-body-heeader-footer">
                                    <div className="jobs-header">
                                        <div className="jobs-header-text">
                                            <h2>{selectedDestino.title}</h2>
                                            <h5>{selectedDestino.ubicacion}, {selectedDestino.lugar}</h5>
                                            <h6>Fecha: {selectedDestino?.createdAt?.slice(0, 10)} - {hour}:{minutes}hs</h6>
                                        </div>
                                        <img src={selectedDestino.cover_photo} alt="" />
                                    </div>
                                    <hr className="hr" />
                                    <div className="jobs-jornada-modalidad">
                                        <p> {selectedDestino.categoria}</p>
                                        <p>Jornada {selectedDestino.jornada}</p>
                                        <p>{selectedDestino.modalidad}</p>
                                    </div>
                                    <div className="jobs-body">
                                        <p>{selectedDestino.description}</p>
                                        <p>Requisitos: <br />{selectedDestino.requisitos}</p>
                                        <p>Salario ${selectedDestino.salario}</p>
                                        <p>Vacantes {selectedDestino.vacantes}</p>
                                    </div>

                                    <div className="jobs-footer">
                                        <p>Publicado por:</p>
                                        <div className="info-user-jobs">
                                            <img className="info-user-img" src={selectedDestino.photo} alt="" />
                                            <div className="info-p">
                                                <p>{selectedDestino.name}</p>
                                                <p>{selectedDestino.mail}</p>
                                            </div>
                                        </div>
                                        <div>

                                        </div>
                                    </div>


                                    <Anchor to={selectedDestino.telefono} >telefono</Anchor>
                                    <Anchor to={selectedDestino.web} >web</Anchor>
                                    <Anchor to={selectedDestino.facebook} >web</Anchor>
                                    <Anchor to={selectedDestino.instagram} >instagram</Anchor>

                                </div>
                            ) : (
                                <div className="select-trabajo"></div>
                            )}
                        </div>



                    </div>
                </div>

            </div>
        );
    }
}
