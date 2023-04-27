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

    function convertToNumber(value) {
        return parseFloat(value.trim().replace(',', ''));
    }
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user?.user_id;
    let nameUser = user?.name
    let mail = user?.mail
    let photo = user?.photo
    console.log(userId)

    async function handleSubmit(e) {
        e.preventDefault()
        let data = {
            "title": title.current.value,
            "description": description.current.value,
            "lugar": continent.current.value,
            "ubicacion": country.current.value,
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
                        </div>
                        <div className='al-lado'>

                            <div >
                                <label >continent </label>
                                <input type="text" placeholder='continent' ref={continent} />

                            </div>
                            <div >
                                <label >country</label>
                                <input type="text" placeholder='country' ref={country} />
                            </div>
                            <div >
                                <label >salario</label>
                                <input type="number" placeholder='country' ref={salario} />
                            </div>
                            <div >
                                <label >vacantes</label>
                                <input type="number" placeholder='country' ref={vacantes} />
                            </div>
                        </div>
                        <div className='inputs'>
                            <label >cover_photo</label>
                            <input className='photo' type="text" placeholder='photo url' ref={cover_photo} />
                        </div>

                    </div>

                    <div>

                        <div className='inputs'>
                            <div className='al-lado'>
                                {/* <div>
                                    <label >seller_id</label>
                                    <input type="text" placeholder='seller_id' ref={seller_id} />
                                </div> */}
                                <div>
                                    <label >Category</label>
                                    <select className='selectCategory' name='selectcategory' id='selectcategory' ref={category_id}>
                                        <option value="#">Select</option>
                                        {categories?.map(category => (
                                            <option key={category.name} value={category?._id}>{category?.name}</option>
                                        ))}
                                    </select>


                                    {/* <label >category_id</label>
                                    <input type="text" placeholder='category_id' ref={category_id} /> */}
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


                <button>Send</button>
            </form>
        </div>
    )
}
