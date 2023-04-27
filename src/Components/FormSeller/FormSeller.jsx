import React from 'react'
import './formSeller.css'
import { useRef } from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux";
import alertActions from "../../Store/Alert/actions";
const { open } = alertActions;
export default function FormSeller() {
    let dispatch = useDispatch();
    let dataForm = useRef()
    const name = useRef()
    const last_name = useRef()
    const city = useRef()
    const country = useRef()
    const date = useRef()
    const photo = useRef()


    async function handleSubmit(e) {
        e.preventDefault()
        let data = {
            "name": name.current.value,
            "last_name": last_name.current.value,
            "city": city.current.value,
            "country": country.current.value,
            "date": date.current.value,
            "photo": photo.current.value
        }
        console.log(data)
        let url = 'http://localhost:8080/seller'
        let token = localStorage.getItem('token')
        let headers = { 'Authorization': `Bearer ${token}` }
        try {
            await axios.post(url, data, { headers: headers })
            console.log('Seller creado')
            let dataAlert = {
                icon: "success",
                title: "Seller Create",
                type: "toast"
            };
            dispatch(open(dataAlert));
            e.target.reset()
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
                <div className='inputs'>
                    <label >Name</label>
                    <input type="text" placeholder='enter your Name' ref={name} />
                </div>
                <div className='inputs'>
                    <label >Last Name</label>
                    <input type="text" placeholder='enter your Last Name' ref={last_name} />
                </div>
                <div className='inputs'>
                    <label >City</label>
                    <input type="text" placeholder='enter your City' ref={city} />
                </div>
                <div className='inputs'>
                    <label >Country</label>
                    <input type="text" placeholder='enter your country' ref={country} />
                </div>
                <div className='inputs'>
                    <label >Date</label>
                    <input type="date" ref={date} />
                </div>
                <div className='inputs'>
                    <label >Photo</label>
                    <input type="text" placeholder='Enter a photo through a url' ref={photo} />
                </div>
                <button>Send</button>
            </form>
        </div>
    )
}
