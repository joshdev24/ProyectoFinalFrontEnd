import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import { getUnnauthenticatedHeaders, POST } from '../../fetching/http.fetching'
import ENVIROMENT from '../../../enviroment';


const ForgotPassword = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const handleSubmitLoginForm = async (e) => {
        try {
            e.preventDefault();
            const form_HTML = e.target;
            const form_Values = new FormData(form_HTML);
            const form_fields = {
                email: form_Values.get('email') || ''
            };

            if (!form_fields.email) {
                console.error('Email is required.');
                return;
            }

            const form_values_object = extractFormData(form_fields, form_Values);


            const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/forgot-password`, {
                headers:  getUnnauthenticatedHeaders(),
                body: JSON.stringify(form_values_object)
            });

            if (response) {
                setSuccess('Revisa tu correo electrónico para restablecer tu contraseña');
            }

        } catch (error) {
            setError('Un error inesperado ocurrio al procesar tu solicitud.');
        }
    };

    return (
        <>
        <div className="password-reset-container">
            <h1 className="password-reset-title">Olvidé mi contraseña</h1>z
            <p className="password-reset-description">
                Enviaremos un mail a tu email de usuario para enviarte los pasos de restablecimiento de la contraseña.
            </p>
            <form onSubmit={handleSubmitLoginForm} className="password-reset-form">
                <div className="input-group">
                    <label htmlFor="email" className="input-label">Ingrese su email:</label>
                    <input 
                        name="email" 
                        id="email" 
                        className="input-field" 
                        placeholder="pepe@gmail.com" 
                        required 
                    />
                </div>
                <button type="submit" className="reset-button">Enviar mail</button>
                <br />
                <ul className="additional-links">
                    <li>Si tienes cuenta puedes <Link to="/login" className="link">iniciar sesión</Link></li>
                    <li>Si aún no tienes cuenta puedes <Link to="/register" className="link">registrarte</Link></li>
                </ul>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    </>
    
    );
};

export default ForgotPassword