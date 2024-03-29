import { useRef } from "react";
import {useNavigate} from "react-router-dom"
import { getCookiesByName } from "../utils/formsUtils.js";

export const NewProducts = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataForm = new FormData(formRef.current) // Tranforma un html a un Objeto Iterador
        const data = Object.fromEntries(dataForm)// Tranforma un Objeto Iterador a Objeto Simple
        const token = getCookiesByName('jwtCookie')
        console.log(token)
        const response = await fetch('https://backend-coderhouse-ifmf.onrender.com/api/products',{
            method:'POST',
            headers:{
                'Authorization': `${token}`,
                'Content-type': 'application/json'    
            },
            body: JSON.stringify(data)
        })
        if(response.status == 200){
            const datos = await response.json()
            console.log(datos)
            navigate('/login')
        }else{
            console.log(response)
        }
    }

    return (
        <div className="container">
            <h2>Creacion de nuevo Producto</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titulo: </label>
                    <input type="text" name="title" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripcion: </label>
                    <input type="text" name="description" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="code" className="form-label">Codigo: </label>
                    <input type="text" name="code" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio: </label>
                    <input type="number" name="price" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock: </label>
                    <input type="number" name="stock" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Categoria: </label>
                    <input type="category" name="category" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Crear Producto</button>
            </form>
        </div>
    )
}