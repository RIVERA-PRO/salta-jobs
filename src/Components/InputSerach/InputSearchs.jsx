import React, { useState, useEffect } from "react";
import './InputSearchs.css'
export default function InputSearchs() {
    let token = localStorage.getItem("token");
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    const [destinos, setDestinos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDestinos, setFilteredDestinos] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [noResults, setNoResults] = useState(false);
    useEffect(() => {
        fetch("http://localhost:8080/destinos", headers)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.destino);
                setDestinos(data.destino);
            });
    }, []);

    useEffect(() => {
        const results = destinos.filter((destino) => {
            return destino.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredDestinos(results);
        setShowResults(searchTerm !== "");
        setNoResults(searchTerm !== "" && results.length === 0);
    }, [destinos, searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Buscar trabajos..."
                value={searchTerm}
                onChange={handleSearch}
                className="inputJobs"
            />
            {showResults && (
                <div className="modal">
                    {filteredDestinos.map((destino) => (
                        <div key={destino._id}>

                            <a href={`/details/${destino._id}`}>{destino.title}</a>
                            <hr />
                        </div>
                    ))}
                    {noResults && <p>No se encontraron resultados.</p>}
                </div>
            )}
        </div>
    )
}
