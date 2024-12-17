import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { extractFormData } from "../../utils/extractFormData";
import { PUT, POST, getAuthenticatedHeaders, GET } from "../../fetching/http.fetching";
import "./ResetPassword.css";
import ENVIROMENT from "../../../enviroment";

const ResetPassword = () => {
    const [step, setStep] = useState(1); // Controla el flujo entre ingresar token y restablecer contraseña
    const [resetToken, setResetToken] = useState(""); // Almacena el token ingresado
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleTokenSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpia errores previos

        try {
            if (!resetToken) {
                throw new Error("Por favor, introduce un token válido.");
            }

            const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/auth/reset-password/${resetToken}`, {
                headers: getAuthenticatedHeaders(),
            });

            if (response === null || response === undefined) {
                throw new Error("No se ha recibido respuesta del servidor.");
            }

            if (response.ok) {
                setStep(2); // Avanza al formulario de restablecimiento de contraseña
            } else {
                const errorText = response.error ? response.error.message : "El token proporcionado no es válido o ha expirado.";
                setError(errorText);
            }
        } catch (error) {
            const errorText = error.message ? error.message : "Error al verificar el token. Por favor, inténtalo nuevamente.";
            setError(errorText);
        }
    };

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
            setError("Error al restablecer la contraseña. Por favor, inténtalo nuevamente.");
        }
    };

    return (
        <div className="reset-password-container">
            {step === 1 ? (
                <>
                    <h1 className="reset-password-title">Verificar Token</h1>
                    <p className="reset-password-subtitle">
                        Por favor, ingresa el token enviado a tu correo electrónico.
                    </p>
                    <form className="reset-token-form" onSubmit={handleTokenSubmit}>
                        <label htmlFor="resetToken" className="input-label">
                            Token de Verificación
                        </label>
                        <input
                            type="text"
                            id="resetToken"
                            name="resetToken"
                            className="input-field"
                            placeholder="Escribe tu token"
                            value={resetToken}
                            onChange={(e) => setResetToken(e.target.value)}
                            required
                        />
                        <button type="submit" className="verify-button">
                            Verificar Token
                        </button>
                    </form>
                </>
            ) : (
                <>
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
                        <button type="submit" className="reset-button">
                            Restablecer Contraseña
                        </button>
                    </form>
                </>
            )}

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
