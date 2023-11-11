import { useRef } from "react";
import {useNavigate} from "react-router-dom"

const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataForm = new FormData(formRef.current) // Tranforma un html a un Objeto Iterador
        const data = Object.fromEntries(dataForm)// Tranforma un Objeto Iterador a Objeto Simple
        console.log(data)
        const response = await fetch('http://localhost:8080/api/sessions/register',{
            method:'POST',
            headers:{
                'Content-type': 'application/json'    
            },
            body: JSON.stringify(data)
        })
        if(response.status == 200){
            const datos = await response.json()
            navigate('/login')
        }else{
            console.log(response)
        }
    }

export const Register = () => {
    return (
        <div className="container">
            <h2>Formulario Login</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">Primer Nombre: </label>
                    <input type="first_name" name="first_name" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Segundo Nombre: </label>
                    <input type="last_name" name="last_name" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Edad: </label>
                    <input type="age" name="age" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email: </label>
                    <input type="email" name="email" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña: </label>
                    <input type="password" name="password" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-dark">Registrarse</button>
            </form>
        </div>
    )
}