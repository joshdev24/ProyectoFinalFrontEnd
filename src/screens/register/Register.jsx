import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import useForm from '../../Hooks/useForm'
import { getUnnauthenticatedHeaders, POST } from '../../fetching/http.fetching'
import ENVIROMENT from '../../../enviroment'
import './Register.css'




const Register = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const form_fields = {
        name: "",
        email: "",
        password: "",
      };
    
      const { form_values_state, handleChangeInputValue } = useForm(form_fields);
      
    
      const handleSubmitRegisterForm = async (e) => {
        try {
        e.preventDefault();
        const form_HTML = e.target;

        if (!form_values_state.email || !form_values_state.password) {
            setError('Por favor, complete todos los campos.');
            setLoading(false);
            return;
        }

            const response = await POST(
            `${ENVIROMENT.URL_BACKEND}/api/auth/register`,
                {
                    headers: getUnnauthenticatedHeaders(),
                    body: JSON.stringify(form_values_state),
                }
            )

            if (response.ok) {
                setSuccess("Te has registrado con exito, revisa tu correo elecxtronico")
            } else {
                setError("Error al registrarte")
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="register-container">
        <h1 className="register-title">Regístrate en nuestra web</h1>
        <form className="register-form" onSubmit={handleSubmitRegisterForm}>
            <div className="form-group">
                <label className="form-label" htmlFor="name">Ingrese su nombre:</label>
                <input 
                    className="form-input" 
                    name="name"
                    id="name"
                    placeholder="Pepe Suarez"
                    onChange={handleChangeInputValue}
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="email">Ingrese su email:</label>
                <input 
                    className="form-input" 
                    name="email"
                    id="email"
                    placeholder="pepe@gmail.com"
                    onChange={handleChangeInputValue}
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="password">Ingrese su contraseña:</label>
                <input 
                    className="form-input" 
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={handleChangeInputValue}
                />
            </div>
            <button className="submit-button" type="submit">Registrar</button>
            <ul className="info-list">
                <li className="info-item">
                    Si ya tienes cuenta puedes ir a <Link to="/login" className="login-link">login</Link>
                </li>
            </ul>
            {error && <p className="error-message">{error}</p>} 
            {success && <p className="success-message">{success}</p>}
        </form>
    </div>
    )
}

export default Register