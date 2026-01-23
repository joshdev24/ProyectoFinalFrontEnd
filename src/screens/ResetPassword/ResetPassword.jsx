import React, { useState } from "react";
import { Link } from "react-router-dom";
import { extractFormData } from "../../utils/extractFormData";
import { PUT, getAuthenticatedHeaders } from "../../fetching/http.fetching";
import "./ResetPassword.css";
import ENVIROMENT from "../../../enviroment";

const ResetPassword = () => {
    const [resetToken, setResetToken] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmitResetForm = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const form_HTML = e.target;
            const form_Values = new FormData(form_HTML);
            const form_fields = {
                password: "",
            };
            const form_values_object = extractFormData(form_fields, form_Values);




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
            const errorText = error.message || "Error al restablecer la contraseña.";
            setError(errorText);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-page">
            <div className="reset-password-card glass-panel">
                <div className="reset-password-header">
                    <h1 className="reset-password-title">Restablecer Contraseña</h1>
                    <p className="reset-password-subtitle">
                        Recupera el acceso a tu cuenta
                    </p>
                </div>

                <form className="reset-password-form" onSubmit={handleSubmitResetForm}>
                    <div className="form-group">
                        <label htmlFor="resetToken" className="form-label">
                            Token de Verificación
                        </label>
                        <input
                            type="text"
                            id="resetToken"
                            name="resetToken"
                            className="glass-input"
                            placeholder="Ingresa el token recibido"
                            value={resetToken}
                            onChange={(e) => setResetToken(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="glass-input"
                            placeholder="Mínimo 8 caracteres"
                            required
                        />
                    </div>

                    <button type="submit" className="glass-button" disabled={loading}>
                        {loading ? "Procesando..." : "Restablecer Contraseña"}
                    </button>
                </form>

                {error && <div className="status-message error">{error}</div>}
                {success && <div className="status-message success">{success}</div>}

                <div className="reset-links">
                    <Link to="/login" className="link">Iniciar Sesión</Link>
                    <span className="divider">|</span>
                    <Link to="/register" className="link">Crear Cuenta</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
