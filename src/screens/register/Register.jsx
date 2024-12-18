import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import useForm from '../../Hooks/useForm'
import { getUnnauthenticatedHeaders, POST } from '../../fetching/http.fetching'
import ENVIROMENT from '../../../enviroment'
import './Register.css'



const Register = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    const handleSubmitRegisterForm = async (event) => {
        event.preventDefault();
        setError('');

        const form_HTML = event.target;
        const form_Values = new FormData(form_HTML);
        const form_fields = {
            name: '',
            email: '',
            password: ''
        };
        const form_values_object = extractFormData(form_fields, form_Values);

        if (!form_values_object.email || !form_values_object.password) {
            setError('Por favor, complete todos los campos.');
            setLoading(false);
            return;
        }

        try {
            const response = await POST(
                `${ENVIROMENT.URL_BACKEND}/api/auth/register`,
                {
                    headers: getUnnauthenticatedHeaders(),
                    body: JSON.stringify(form_values_object)
                }
            )

            if (response.ok) {
                setSuccess("Te has registrado con exito")
            } else {
                setError(response.payload.message)
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="registro-container">
            <h1 className="registro-title">Regístrate en nuestra web</h1>
            <form className="registro-form" onSubmit={handleSubmitRegisterForm}>
                <div className="registro-form-group">
                    <label className="registro-form-label" htmlFor="name">Ingrese su nombre:</label>
                    <input
                        className="registro-form-input registro-form-input-name"
                        name="name"
                        id="name"
                        placeholder="Pepe Suarez"
                    />
                </div>
                <div className="registro-form-group">
                    <label className="registro-form-label" htmlFor="email">Ingrese su email:</label>
                    <input
                        className="registro-form-input registro-form-input-email"
                        name="email"
                        id="email"
                        placeholder="pepe@gmail.com"
                    />
                </div>
                <div className="registro-form-group">
                    <label className="registro-form-label" htmlFor="password">Ingrese su contraseña:</label>
                    <input
                        className="registro-form-input registro-form-input-password"
                        name="password"
                        id="password"
                        type="password"
                        placeholder="••••••••"
                    />
                </div>
                <button className="registro-button" type="submit">Registrar</button>
                <ul className="registro-login-link-list">
                    <li className="registro-login-link-item">
                        <Link to="/login" className="registro-login-link">Si ya tienes cuenta, inicia sesión</Link>
                    </li>
                    <li className="registro-login-link-item">
                         <Link to="/verify" className="verify-user-button">Verificar usuario</Link>
                    </li>
                </ul>
                {error && <p className="registro-error-message form-error">{error}</p>}
                {success && <p className="registro-success-message form-success">{success}</p>}
            </form>
        </div>

    )
}

export default Register