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

            if (!reset_token) {
                setError('No se encontr  el token de restablecimiento de contrase a')
                return
            }

            const response = await PUT(`${ENVIROMENT.URL_BACKEND}/api/auth/reset-password/` + reset_token, {
                headers: getUnnauthenticatedHeaders(),
                "Access-Control-Allow-Origin": "*",
                body: JSON.stringify(form_values_object)
            })

            if (response.ok) {
                setSuccess('Contrase a restablecida con  xito')
            } else {
                setError('Error al restablecer contrase a')
            }
        } catch (error) {
            setError('Error al restablecer contrase a')
            console.error('Error:', error)
        }
    }

    return (
        <div class="reset-password-container">
            <h1 class="reset-password-title">Restablecer Contrase a</h1>
            <p class="reset-password-subtitle">
                Ingresa tu nueva contrase a para recuperar el acceso.
            </p>
            <form class="reset-password-form" onSubmit={handleSubmitResetForm}>
                <label for="password" class="input-label">Nueva Contrase a</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    class="input-field" 
                    placeholder="Escribe tu nueva contrase a" 
                    required 
                />
                <button type="submit" class="reset-button">Restablecer Contrase a</button>
            </form>
            <div class="additional-links">
                <p>
                    <a href="/login">Volver a Iniciar Sesien</a>
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