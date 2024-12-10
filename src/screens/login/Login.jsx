import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { extractFormData } from '../../utils/extractFormData';
import { getUnnauthenticatedHeaders, POST } from '../../fetching/http.fetching';
import ENVIROMENT from '../../../enviroment';
import './Login.css';



const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmitLoginForm = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const form_HTML = e.target;
        const form_Values = new FormData(form_HTML);
        const form_fields = {
            email: '',
            password: ''
        };
        const form_values_object = extractFormData(form_fields, form_Values);

        try {
            const response = await POST(
                `${ENVIROMENT.URL_BACKEND}/api/auth/login`,
                {
                    headers: getUnnauthenticatedHeaders(),
                    "Access-Control-Allow-Origin": "*",
                    body: JSON.stringify(form_values_object)
                }
            );

            if (!response) {
                setError('Error al iniciar sesión.', error);
                setLoading(false);
                return;
            }

            setSuccess('Inicio de sesión exitoso.');

            const access_token = response.payload.token;
            sessionStorage.setItem('access_token', access_token)
            sessionStorage.setItem('user_info', JSON.stringify(response.payload.user))

            navigate('/home');


            
        } catch (error) {
            console.error('Error:', error);
            setError('Ocurrió un error al intentar iniciar sesión.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="login-container">
            <h1 className="login-title">Inicia sesión</h1>
            <form onSubmit={handleSubmitLoginForm} className="login-form">
                <div className="input-group">
                    <label htmlFor="email" className="input-label">Ingrese su email:</label>
                    <input name="email" id="email" placeholder="pepe@gmail.com" className="input-field" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password" className="input-label">Ingrese su contraseña:</label>
                    <input name="password" id="password" type="password" placeholder="Ingrese su contraseña" className="input-field" required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar sesión'}
                </button>
            </form>
            <ul className="register-link">
                <li>Si aún no tienes cuenta puedes <Link to="/register">Registrarte</Link></li>
                <li>¿Has olvidado la contraseña? <Link to="/forgot-password">Restablecer</Link></li>
            </ul>
        </div>
    );
};

export default Login;