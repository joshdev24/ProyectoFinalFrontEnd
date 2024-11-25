import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import { POST } from '../../fetching/http.fetching'
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
                headers: { 'Content-Type': 'application/json' },
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
            <div>
                <h1>Olvide mi contraseña</h1>
                <p>Enviaremos un mail a tu email de usuario para enviarte los pasos de restablecimiento de la contraseña.</p>
                <form onSubmit={handleSubmitLoginForm}>
                    <div>
                        <label htmlFor='email'>Ingrese su email:</label>
                        <input name='email' id='email' placeholder='pepe@gmail.com' required />
                    </div>
                    <button type='submit'>Enviar mail</button>
                    <br/>
                    <itemize>
                <li> Si tienes cuenta puedes <Link to='/login'>iniciar sesion</Link></li>
                <li>Si aun no tienes cuenta puedes <Link to='/register'>Registrarte</Link></li>
            </itemize>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>} 
                {success && <p style={{ color: 'green' }}>{success}</p>} 

            </div>
            
        </>
    );
};

export default ForgotPassword