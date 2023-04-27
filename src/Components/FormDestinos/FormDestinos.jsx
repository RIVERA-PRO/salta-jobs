import React from 'react'
import { useRef } from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux";
import alertActions from "../../Store/Alert/actions";
import './FormDestinos.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const { open } = alertActions;

export default function FormDestinos() {
    const [categories, setCategories] = useState([]);
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }

    useEffect(() => {
        fetch("http://localhost:8080/destinos/categories")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.categories)
                setCategories(data.categories)
            })
    }, [])

    let dispatch = useDispatch();
    let dataForm = useRef()
    const title = useRef()
    const cover_photo = useRef()
    const category_id = useRef()
    const { seller_id } = useParams()
    const { user_id } = useParams()
    const categoria = useRef()
    const vacantes = useRef()
    const salario = useRef()

    const description = useRef()
    const continent = useRef()
    const country = useRef()

    const web = useRef()
    const instagram = useRef()
    const facebook = useRef()
    const telefono = useRef()
    const requisitos = useRef()


    function convertToNumber(value) {
        return parseFloat(value.trim().replace(',', ''));
    }
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user?.user_id;
    let nameUser = user?.name
    let mail = user?.mail
    let photo = user?.photo
    console.log(userId)
    const jornadas = [
        "Completa",
        "Parcial",
        "Intensiva",
        "Flexible",
    ];
    const [selectJornada, selectJornada2] = useState('');
    const jornadaRef = useRef(null);

    const handleJornada = (e) => {
        selectJornada2(e.target.value);
    };

    const modalidades = [
        "Presencial",
        "Hibrido",
        "Remoto",
    ];
    const [selectModalidad, selectModalidad2] = useState('');
    const modalidadRef = useRef(null);

    const handleModalidad = (e) => {
        selectModalidad2(e.target.value);
    };
    const SaltaDepartments = [
        "Otros",
        "Anta",
        "Cachi",
        "Cafayate",
        "Salta",
        "Cerrillos",
        "Chicoana",
        "General Güemes",
        "Guachipas",
        "Iruya",
        "La Caldera",
        "La Candelaria",
        "La Poma",
        "La Viña",
        "Los Andes",
        "Metán",
        "Molinos",
        "Orán",
        "Rivadavia",
        "Rosario de la Frontera",
        "Rosario de Lerma",
        "San Carlos",
        "San Martín",
        "Santa Victoria"
    ];
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const countryRef = useRef(null);

    const handleSelect = (e) => {
        setSelectedDepartment(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault()
        let data = {
            "title": title.current.value,
            "description": description.current.value,
            "lugar": continent.current.value,
            "ubicacion": countryRef.current.value,
            vacantes: convertToNumber(vacantes.current.value),
            salario: convertToNumber(salario.current.value),
            "cover_photo": cover_photo.current.value,
            "seller_id": seller_id,
            "user_id": userId,
            "category_id": category_id.current.value,
            "categoria": categoria.current.value,
            "name": nameUser,
            "photo": photo,
            "mail": mail,
            "web": web.current.value,
            "instagram": instagram.current.value,
            "facebook": facebook.current.value,
            "telefono": telefono.current.value,
            "requisitos": requisitos.current.value,
            "jornada": jornadaRef.current.value,
            "modalidad": modalidadRef.current.value,

        }
        console.log(data)
        let url = 'http://localhost:8080/destinos'
        let token = localStorage.getItem('token')
        let headers = { 'Authorization': `Bearer ${token}` }
        try {
            await axios.post(url, data, { headers: headers })
            console.log('Destinations creado')
            let dataAlert = {
                icon: "success",
                title: "Destinations Create",
                type: "toast"
            };
            dispatch(open(dataAlert));
            // e.target.reset()
        }
        catch (err) {
            console.log(err)
            let dataAlert = {
                icon: "error",
                title: err,
                type: "toast"
            };
            dispatch(open(dataAlert));
        }


    }

    return (
        <div className='formSeller'>
            <form onSubmit={handleSubmit} className='sellerFormulario'>
                <div className='contain-destin'>
                    <div>
                        <div className='inputs'>
                            <label >title</label>
                            <input type="text" placeholder='title' ref={title} />
                        </div>
                        <div className='inputs'>
                            <label >description</label>
                            <input type="text" placeholder='description' ref={description} />
                            <label >requisitos</label>
                            <input type="text" placeholder='requisitos' ref={requisitos} />
                        </div>
                        <div className='al-lado'>

                            <div >
                                <label >continent </label>
                                <input type="text" placeholder='continent' ref={continent} />

                            </div>
                            <div>
                                <div>
                                    <label htmlFor="country">Departamento</label>
                                    <select id="country" value={selectedDepartment} onChange={handleSelect} ref={countryRef}>
                                        <option value="">Departamento</option>
                                        {SaltaDepartments.map((department) => (
                                            <option key={department} value={department}>
                                                {department}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="jornada">Jornada</label>
                                    <select id="jornada" value={selectJornada} onChange={handleJornada} ref={jornadaRef}>
                                        <option value="">Jornada</option>
                                        {jornadas.map((jornad) => (
                                            <option key={jornad} value={jornad}>
                                                {jornad}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="modalidad">Modalidad</label>
                                    <select id="modalidad" value={selectModalidad} onChange={handleModalidad} ref={modalidadRef}>
                                        <option value="">Modalidad</option>
                                        {modalidades.map((modalid) => (
                                            <option key={modalid} value={modalid}>
                                                {modalid}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>

                            </div>

                        </div>
                        <div >
                            <label >salario</label>
                            <input type="number" placeholder='country' ref={salario} />
                        </div>
                        <div >
                            <label >vacantes</label>
                            <input type="number" placeholder='country' ref={vacantes} />
                        </div>
                        <div className='inputs'>
                            <label >cover_photo</label>
                            <input type="text" placeholder='photo url' ref={cover_photo} />
                        </div>

                    </div>

                    <div>

                        <div className='inputs'>
                            <div className='al-lado'>

                                <div>
                                    <label >Category</label>
                                    <select className='selectCategory' name='selectcategory' id='selectcategory' ref={category_id}>
                                        <option value="#">Select</option>
                                        {categories?.map(category => (
                                            <option key={category.name} value={category?._id}>{category?.name}</option>
                                        ))}
                                    </select>


                                </div>
                            </div>
                        </div>
                        <div className='inputs'>
                        </div>
                        <div className='inputs'>
                            <label>categoria</label>
                            <input type="text" placeholder='package ' ref={categoria} />
                        </div>
                        <div className='inputs'>
                            <label>Contacto</label>
                            <input type="number" placeholder='telefono ' ref={telefono} />
                            <input type="text" placeholder='web ' ref={web} />
                            <input type="text" placeholder='facebook ' ref={facebook} />
                            <input type="text" placeholder='instagram ' ref={instagram} />
                        </div>
                    </div>

                </div>


                <button>Crear</button>
            </form>
        </div>
    )
}
