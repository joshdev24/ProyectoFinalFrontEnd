import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { extractFormData } from '../../utils/extractFormData';
import { getUnnauthenticatedHeaders, POST } from '../../fetching/http.fetching';
import ENVIROMENT from '../../../enviroment';
import './Register.css';

const Register = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmitRegisterForm = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        const form_HTML = event.target;
        const form_Values = new FormData(form_HTML);
        const form_fields = {
            name: '',
            email: '',
            password: ''
        };
        const form_values_object = extractFormData(form_fields, form_Values);

        if (!form_values_object.email || !form_values_object.password || !form_values_object.name) {
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
            );

            if (response.ok) {
                setSuccess("¡Cuenta creada con éxito!");
            } else {
                setError("Hubo un problema al registrar. Verifique sus datos.");
            }
        } catch (error) {
            console.error(error);
            setError("Error de conexión al servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-wrapper">
            <div className="register-card-aurora">
                <div className="register-header">
                    <h1 className="register-title text-gradient">Registrate</h1>
                    <p className="register-subtitle">Crea tu cuenta para comenzar</p>
                </div>

                <form className="register-form" onSubmit={handleSubmitRegisterForm}>
                    <div className="register-form-group">
                        <label className="register-label" htmlFor="name">Nombre completo</label>
                        <input
                            className="glass-input"
                            name="name"
                            id="name"
                            placeholder="Ej. Juan Pérez"
                            required
                        />
                    </div>

                    <div className="register-form-group">
                        <label className="register-label" htmlFor="email">Correo electrónico</label>
                        <input
                            className="glass-input"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="nombre@ejemplo.com"
                            required
                        />
                    </div>

                    <div className="register-form-group">
                        <label className="register-label" htmlFor="password">Contraseña</label>
                        <input
                            className="glass-input"
                            name="password"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <div className="status-message status-error">{error}</div>}

                    {success && (
                        <div className="status-message" style={{ background: 'rgba(0, 255, 128, 0.15)', color: '#4ade80', border: '1px solid rgba(0, 255, 128, 0.2)' }}>
                            {success}
                        </div>
                    )}

                    <button
                        className="glass-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Crear Cuenta'}
                    </button>
                </form>

                <div className="register-footer">
                    <p className="register-footer-text">
                        ¿Ya tienes una cuenta? <Link to="/login" className="link">Inicia sesión</Link>
                    </p>
                    <Link to="/verify" className="verify-link">Verificar usuario existente</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;