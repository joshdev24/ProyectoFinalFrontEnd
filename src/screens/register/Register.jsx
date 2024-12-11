import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import useForm from '../../Hooks/useForm'
import { getUnnauthenticatedHeaders, POST } from '../../fetching/http.fetching'
import ENVIROMENT from '../../../enviroment'



const Register = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSubmitRegisterForm = async (event) => {
        event.preventDefault();
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
                setError("Error al registrarte")
            }
            console.log(body)
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
                        Si ya tienes cuenta puedes ir a{" "}
                        <Link to="/login" className="registro-login-link">login</Link>
                    </li>
                </ul>
                {error && <p className="registro-error-message form-error">{error}</p>}
                {success && <p className="registro-success-message form-success">{success}</p>}
            </form>
        </div>

    )
}

export default Register