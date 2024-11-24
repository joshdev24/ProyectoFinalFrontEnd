import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import useForm from '../../Hooks/useForm'
import { getUnnauthenticatedHeaders, POST } from '../../fetching/http.fetching'
import ENVIROMENT from '../../../enviroment'



const Register = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSubmitRegisterForm = async (event) => {
        event.preventDefault();
        event.preventDefault();
        setError('');

        const form_HTML = event.target;
        const form_Values = new FormData(form_HTML);
        const form_fields = {
            name: '',
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
                'http://localhost:3000/api/auth/register',
                {
                    headers: getUnnauthenticatedHeaders(),
                    body: JSON.stringify(form_values_object)
                }
            )

            if (response.ok) {
                setSuccess("Te has registrado con exito")
            } else {
                setError("Error al registrarte")
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h1>Registrate en nuesta web</h1>
            <form onSubmit={handleSubmitRegisterForm}>
                <div>
                    <label htmlFor='name'>Ingrese su nombre:</label>
                    <input name='name'
                        id='name'
                        placeholder='Pepe Suarez'
                    />
                </div>
                <div>
                    <label htmlFor='email'>Ingrese su email:</label>
                    <input name='email'
                        id='email'
                        placeholder='pepe@gmail.com'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Ingrese su contraseña:</label>
                    <input name='password'
                        id='password'
                        placeholder='pepe@gmail.com'
                    />
                </div>
                <button type='submit'>Registrar</button>
                <itemize>
                    <li>Si ya tienes cuenta puedes ir a <Link to='/login' style={{ color: 'blue' }}>login</Link> </li>
                </itemize>
                {error && <p style={{ color: 'red' }}>{error}</p>} 
				{success && <p style={{ color: 'green' }}>{success}</p>}
            </form>


        </div>
    )
}

export default Register