import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { extractFormData } from "../../utils/extractFormData";
import { PUT, getAuthenticatedHeaders, GET, POST } from "../../fetching/http.fetching";
import "./ResetPassword.css";
import ENVIROMENT from "../../../enviroment";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PUT } from "your-api-utils"; // Reemplaza con tu utilidad real
import { ENVIROMENT, getAuthenticatedHeaders, extractFormData } from "your-helpers"; // Ajusta las importaciones

const ResetPassword = () => {
    const [resetToken, setResetToken] = useState(""); // Almacena el token ingresado
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [showTokenField, setShowTokenField] = useState(false); // Controla cuándo se solicita el token

    const handleSubmitResetForm = async (e) => {
        e.preventDefault();
        setError(""); // Limpia errores previos

        try {
            const form_HTML = e.target;
            const form_Values = new FormData(form_HTML);
            const form_fields = {
                password: "",
            };
            const form_values_object = extractFormData(form_fields, form_Values);

            // Primero verifica si el usuario ya ingresó el token
            if (!showTokenField) {
                setShowTokenField(true); // Muestra el campo del token
                return;
            }

            if (!resetToken) {
                throw new Error("Por favor, introduce un token válido.");
            }

            // Envía la solicitud con el token y la nueva contraseña
            const response = await PUT(
                `${ENVIROMENT.URL_BACKEND}/api/auth/reset-password/${resetToken}`,
                {
                    headers: getAuthenticatedHeaders(),
                    body: JSON.stringify(form_values_object),
                }
            );

            if (response.ok) {
                setSuccess("¡Contraseña restablecida con éxito! Ahora puedes iniciar sesión.");
            } else {
                throw new Error("Error al restablecer la contraseña.");
            }
        } catch (error) {
            const errorText = error.message || "Error al restablecer la contraseña. Por favor, inténtalo nuevamente.";
            setError(errorText);
        }
    };

    return (
        <div className="reset-password-container">
            <h1 className="reset-password-title">Restablecer Contraseña</h1>
            <p className="reset-password-subtitle">
                Ingresa tu nueva contraseña para recuperar el acceso.
            </p>

            <form className="reset-password-form" onSubmit={handleSubmitResetForm}>
                <label htmlFor="password" className="input-label">
                    Nueva Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="input-field"
                    placeholder="Escribe tu nueva contraseña"
                    required
                />

                {showTokenField && (
                    <>
                        <label htmlFor="resetToken" className="input-label">
                            Token de Verificación
                        </label>
                        <input
                            type="text"
                            id="resetToken"
                            name="resetToken"
                            className="input-field"
                            placeholder="Escribe el token de verificación"
                            value={resetToken}
                            onChange={(e) => setResetToken(e.target.value)}
                            required
                        />
                    </>
                )}

                <button type="submit" className="reset-button">
                    {showTokenField ? "Restablecer Contraseña" : "Continuar"}
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <div className="additional-links">
                <p>
                    <Link to="/login">Volver a Iniciar Sesión</Link>
                    <span> | </span>
                    <Link to="/register">Crear una cuenta</Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;

