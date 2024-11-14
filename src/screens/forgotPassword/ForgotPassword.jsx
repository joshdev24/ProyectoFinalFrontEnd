import React from 'react'
import { Link } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import { POST } from '../../fetching/http.fetching'



const ForgotPassword = () => {
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
            const response = await POST('http://localhost:3000/api/auth/forgot-password', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form_values_object)
            });

            const body = await response.json();
            
            if (!response.ok) {
                console.error('Error sending email:', body);
                // setError('Error sending email');
                return;
            }

            console.log('Email sent successfully:', body);
        } catch (error) {
            console.error('An error occurred:', error);
            // setError('An error occurred');
        }
    };

    return (
        <div>
            <h1>Olvide mi contraseña</h1>
            <p>Enviaremos un mail a tu email de usuario para enviarte los pasos de restablecimiento de la contraseña.</p>
            <form onSubmit={handleSubmitLoginForm}>
                <div>
                    <label htmlFor='email'>Ingrese su email:</label>
                    <input name='email' id='email' placeholder='pepe@gmail.com' required />
                </div>
                <button type='submit'>Enviar mail</button>
            </form>
            <span>Si tienes cuenta puedes <Link to='/login'>iniciar sesion</Link></span>
            <span>Si aun no tienes cuenta puedes <Link to='/register'>Registrarte</Link></span>
        </div>
    );
};

export default ForgotPassword