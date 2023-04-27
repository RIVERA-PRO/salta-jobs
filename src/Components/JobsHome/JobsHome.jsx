import React, { useState, useEffect } from "react";
import Spiral from "../Spiral/Spiral";
import { Link as Anchor } from "react-router-dom";
import "./JobsHome.css";
import { useRef } from 'react'
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
                    (salario === "1000" && destino?.salario <= 1000) ||
                    (salario === "2000" &&
                        destino?.salario > 1000 &&
                        destino?.salario <= 2000) ||
                    (salario === "3000" &&
                        destino?.salario > 2000 &&
                        destino?.salario <= 3000) ||
                    (salario === "4000" &&
                        destino?.salario > 3000 &&
                        destino?.salario <= 4000) ||
                    (salario === "5000" && destino?.salario > 4000)) &&
                (ubicacion === "" || destino?.ubicacion === ubicacion) &&
                (lugar === "" || destino?.lugar === lugar)
        );




        return (
            <div className="contain-destinos">
                <h3>Explore the destinations</h3>

                <div className="filtros">
                    <div>

                        <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                            <option value="">Categorias</option>
                            {categoriasUnicas.map((categoria) => (
                                <option key={categoria} value={categoria}>
                                    {categoria}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select value={salario} onChange={(e) => setSalario(e.target.value)}>
                            <option value="">Salario</option>
                            <option value="1000">$1000 or less</option>
                            <option value="2000">$1000 - $2000</option>
                            <option value="3000">$2000 - $3000</option>
                            <option value="4000">$3000 - $4000</option>
                            <option value="5000">$4000 or more</option>
                        </select>
                    </div>

                    <div>
                        <select
                            value={ubicacion}
                            onChange={(e) => setUbicacion(e.target.value)}
                        >
                            <option value="">Lugar</option>
                            <option value="New York">New York</option>
                            <option value="Los Angeles">Los Angeles</option>
                            <option value="Salta">Salta</option>
                            <option value="Houston">Houston</option>
                            <option value="Miami">Miami</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>

                        <select id="lugar" value={lugar} onChange={(e) => setLugar(e.target.value)}>
                            <option value="">Ubicacion</option>
                            {destinos && [...new Set(destinos.map((destino) => destino.lugar))].map((lugar) => (
                                <option key={lugar} value={lugar}>
                                    {lugar}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="jobs-contain-total">

                    <div className="destinos-contain">
                        <div className="inputsearch">
                            <input
                                type="text"
                                placeholder="Search...."
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
                                                <h2>{destino?.title.slice(0, 30)}</h2>

                                                <div className="info-user-jobs">
                                                    <img className="info-user-img" src={destino?.photo} alt="" />
                                                    <div className="info-p">
                                                        <h6>{destino?.name}</h6>
                                                        <h6>{destino?.mail}</h6>
                                                    </div>
                                                </div>
                                                <div className="price-link">

                                                    <button className="btn-preview" onClick={() => setSelectedDestino(destino) && handlePreviewClick()}>
                                                        Visualizar
                                                    </button>

                                                    <Anchor
                                                        className="btn-details"
                                                        to={`/details/${destino?._id}`}
                                                    >
                                                        Details
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

                    <div className="destino-details">

                        <div className="destino-details">
                            {selectedDestino ? (
                                <div>
                                    <div className="jobs-header">
                                        <div className="jobs-header-text">
                                            <h2>{selectedDestino.title}</h2>
                                            <h5>{selectedDestino.ubicacion}, {selectedDestino.lugar}</h5>
                                            <h6>Fecha: {selectedDestino?.createdAt?.slice(0, 10)} - {hour}:{minutes}hs</h6>

                                        </div>
                                        <img src={selectedDestino.cover_photo} alt="" />
                                    </div>

                                    <div className="jobs-body">
                                        <h5>{selectedDestino.description}</h5>
                                        <h5>Categoria {selectedDestino.categoria}</h5>
                                        <h5>Salario ${selectedDestino.salario}</h5>
                                        <h5>Vaantes {selectedDestino.vacantes}</h5>
                                    </div>
                                    <div className="info-user-jobss">
                                        <img className="info-user-img" src={selectedDestino.photo} alt="" />
                                        <div className="info-p">
                                            <h6>{selectedDestino.name}</h6>
                                            <h6>{selectedDestino.mail}</h6>
                                        </div>
                                    </div>


                                    <Anchor to={selectedDestino.telefono} >telefono</Anchor>
                                    <Anchor to={selectedDestino.web} >web</Anchor>
                                    <Anchor to={selectedDestino.facebook} >web</Anchor>
                                    <Anchor to={selectedDestino.instagram} >instagram</Anchor>

                                </div>
                            ) : (
                                <h2>Selecciona un trabajo</h2>
                            )}
                        </div>



                    </div>
                </div>

            </div>
        );
    }
}
