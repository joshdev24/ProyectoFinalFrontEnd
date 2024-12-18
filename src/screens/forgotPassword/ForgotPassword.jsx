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
                headers: getUnnauthenticatedHeaders(),
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
            <div class="card">
  <div class="card-overlay"></div>
  <div class="card-inner">
    <div class="password-reset-container">
      <h1 class="password-reset-title">Olvidé mi contraseña</h1>
      <p class="password-reset-instructions">
        Enviaremos un token a tu email de usuario con los pasos de restablecimiento de la contraseña.
      </p>
      <form class="password-reset-form" onSubmit={handleSubmitLoginForm}>
        <div class="form-group">
          <label htmlFor="email" class="form-label">Ingrese su email:</label>
          <input
            name="email"
            id="email"
            class="form-input"
            placeholder="pepe@gmail.com"
            required
          />
        </div>
        <button type="submit" class="form-button">Obtener token</button>
        <br />
        <Link to="/reset-password" class="verify-user-button">Verificar usuario</Link>
        <ul class="form-links">
          <li>Si tienes cuenta puedes <Link to="/login">iniciar sesión</Link></li>
          <li>Si aún no tienes cuenta puedes <Link to="/register">Registrarte</Link></li>
        </ul>
      </form>
      {error && <p class="form-error">{error}</p>}
      {success && <p class="form-success">{success}</p>}
    </div>
  </div>
</div>

            
        </>
    );
};

export default ForgotPassword