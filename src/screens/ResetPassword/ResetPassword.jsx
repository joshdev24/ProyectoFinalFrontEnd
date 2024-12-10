import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import { getUnnauthenticatedHeaders, PUT } from '../../fetching/http.fetching'
import "./ResetPassword.css"
import { useState } from 'react'
import ENVIROMENT from '../../../enviroment'


const ResetPassword = () => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const { reset_token } = useParams()

    const handleSubmitResetForm = async (e) => {
        try {
        e.preventDefault()
        const form_HTML = e.target
        const form_Values = new FormData(form_HTML)
        const form_fields = {
            'password': ''
        }
        const form_values_object = extractFormData(form_fields, form_Values)
        const response = await PUT(`${ENVIROMENT.URL_BACKEND}/api/auth/reset-password/`, {
            headers: getUnnauthenticatedHeaders(),
            "Access-Control-Allow-Origin": "*",
				body: JSON.stringify(form_values_object)
			})
            if (response.ok) {
                setSuccess('Contraseña restablecida con exito')
            }
			console.log({response})
		}
		catch(error){
			setError('Error al restablecer contraseña')
			
		}
    }

    return (
        <div class="reset-password-container">
    <h1 class="reset-password-title">Restablecer Contraseña</h1>
    <p class="reset-password-subtitle">
        Ingresa tu nueva contraseña para recuperar el acceso.
    </p>
    <form class="reset-password-form" onSubmit={handleSubmitResetForm}>
        <label for="password" class="input-label">Nueva Contraseña</label>
        <input 
            type="password" 
            id="password" 
            name="password" 
            class="input-field" 
            placeholder="Escribe tu nueva contraseña" 
            required 
        />
        <button type="submit" class="reset-button">Restablecer Contraseña</button>
    </form>
    <div class="additional-links">
        <p>
            <a href="/login">Volver a Iniciar Sesión</a>
            <span> | </span>
            <a href="/register">Crear una cuenta</a>
        </p>
    </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} 
				{success && <p style={{ color: 'green' }}>{success}</p>} 
    
    </div>
    )
}

export default ResetPassword