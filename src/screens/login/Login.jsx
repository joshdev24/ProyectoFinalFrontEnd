import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { extractFormData } from '../../utils/extractFormData';
import { getUnnauthenticatedHeaders, POST } from '../../fetching/http.fetching';
import './Login.css';
import ENVIROMENT from '../../../enviroment';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
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

        if (!form_values_object.email || !form_values_object.password) {
            setError('Por favor, complete todos los campos.');
            setLoading(false);
            return;
        }

        try {
            const response = await POST(
                `${ENVIROMENT.URL_BACKEND}/api/auth/login`,
                {
                    headers: getUnnauthenticatedHeaders(),
                    body: JSON.stringify(form_values_object)
                }
            );

            if (!response.ok) {
                setError('Credenciales incorrectas');
                setLoading(false);
                return;
            }

            const access_token = response.payload.token;
            if (!access_token) {
                setError('Error al obtener token');
                setLoading(false);
                return;
            }

            sessionStorage.setItem('access_token', access_token);
            sessionStorage.setItem('user_info', JSON.stringify(response.payload.user));
            navigate('/home');
        } catch (error) {
            console.log('Error:', error);
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card-aurora">
                <div className="brand-area">
                    <h1 className="brand-logo text-gradient">Login</h1>
                    <p className="brand-subtitle">Bienvenido de vuelta</p>
                </div>

                <form onSubmit={handleSubmitLoginForm}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="glass-input"
                            placeholder="nombre@ejemplo.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            className="glass-input"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <div className="status-message status-error">{error}</div>}

                    <button type="submit" className="glass-button" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>¿No tienes cuenta? <Link to="/register" className="link">Regístrate</Link></span>
                    <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                        Olvidé mi contraseña
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
