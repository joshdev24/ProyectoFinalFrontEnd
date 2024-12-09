import React from 'react'
import { useParams } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import { PUT, getUnnauthenticatedHeaders } from '../../fetching/http.fetching'
import "./ResetPassword.css"
import { useState } from 'react'


const ResetPassword = () => {

    const { reset_token } = useParams()
    const [errors, setErrors] = useState('')
    const [responseFetch, setResponseFetch] = useState('')

    const formSchema = {
        'password': '',
    }
    const { form_values_state, handleChangeInputValue } = useForm(formSchema)

    const handleSubmitResetPasswordForm = async (e) => {
        try {
            e.preventDefault()
            if (form_values_state.password !== form_values_state.confirm_password) {
                return setErrors('Passwords do not match')
            } else {
                setErrors('')
            }
            const response = await PUT(`${ENVIROMENT.URL_BACKEND}/api/auth/reset-password/${reset_token}`, {
                headers: getUnnauthenticatedHeaders(),
                body: JSON.stringify(form_values_state)
            })
            if (!response.ok) {
                return setErrors(response.payload.detail)
            } else {
                setResponseFetch(response.message)
            }
            console.log({ response })
        }
        catch (error) {
            error.message
        }
    }

    return (
        <div class="reset-password-container">
    <h1 class="reset-password-title">Restablecer Contraseña</h1>
    <p class="reset-password-subtitle">
        Ingresa tu nueva contraseña para recuperar el acceso.
    </p>
    <form class="reset-password-form" onSubmit={handleSubmitResetPasswordForm}>
        <label for="password" class="input-label">Nueva Contraseña</label>
        <input 
            type="password" 
            id="password" 
            name="password" 
            class="input-field" 
            placeholder="Escribe tu nueva contraseña" 
            required 
            onChange={handleChangeInputValue}
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
        {error && <p style={{ color: 'red' }}>{errors}</p>} 
				{success && <p style={{ color: 'green' }}>{responseFetch}</p>} 
    
    </div>
    )
}

export default ResetPassword