import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import { getUnnauthenticatedHeaders, POST } from '../../fetching/http.fetching'
import ENVIROMENT from '../../../enviroment';
import './forgotPassword.css'

const ForgotPassword = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmitLoginForm = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError('');
      setSuccess(false);

      const form_HTML = e.target;
      const form_Values = new FormData(form_HTML);
      const form_fields = {
        email: form_Values.get('email') || ''
      };

      if (!form_fields.email) {
        console.error('Email is required.');
        setLoading(false);
        return;
      }

      const form_values_object = extractFormData(form_fields, form_Values);
      const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/forgot-password`, {
        headers: getUnnauthenticatedHeaders(),
        body: JSON.stringify(form_values_object)
      });

      if (response) {
        setSuccess('Revisa tu correo electrónico para restablecer tu contraseña');
      }

    } catch (error) {
      setError('Un error inesperado ocurrió al procesar tu solicitud.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card glass-panel">
        <h1 className="forgot-password-title">Recuperar Contraseña</h1>
        <p className="forgot-password-instructions">
          Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.
        </p>

        <form className="forgot-password-form" onSubmit={handleSubmitLoginForm}>
          <div className="input-group">
            <label htmlFor="email" className="input-label">Correo Electrónico</label>
            <input
              name="email"
              id="email"
              type="email"
              className="glass-input"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <button type="submit" className="glass-button" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Instrucciones"}
          </button>

          <Link to="/reset-password" class="link">
            Ya tengo un código
          </Link>
        </form>

        {error && <div className="status-box error">{error}</div>}
        {success && <div className="status-box success">{success}</div>}

        <div className="form-links-list">
          <span>¿Ya tienes cuenta? <Link to="/login" className="link">Inicia Sesión</Link></span>
          <span>¿No tienes cuenta? <Link to="/register" className="link">Regístrate</Link></span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword