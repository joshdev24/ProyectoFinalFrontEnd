
import { GET, getUnnauthenticatedHeaders } from "../fetching/http.fetching";
import { useState } from "react";
import ENVIROMENT from "../../enviroment";
import { Link } from "react-router-dom";
import "./EmailVerify.css";

const VerifyMail = () => {
  const [verificationToken, setVerificationToken] = useState("");
  const [responseStatus, setResponseStatus] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    setResponseStatus(null);
    setIsSuccess(false);

    try {
      if (!verificationToken) {
        throw new Error("Por favor, introduce un token de verificación");
      }

      const response = await GET(
        `${ENVIROMENT.URL_BACKEND}/api/auth/verify/${verificationToken}`,
        {
          headers: getUnnauthenticatedHeaders(),
        }
      );

      if (!response) {
        throw new Error("No se ha recibido respuesta alguna");
      }

      if (response.status === 200) {
        setResponseStatus("¡Correo verificado con éxito!");
        setIsSuccess(true);
      } else {
        setResponseStatus(
          `Error al verificar tu correo. Código: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error en la verificación de correo", error);
      setResponseStatus(
        error.message ? error.message : "Error al verificar el correo"
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card glass-panel">
        <h1 className="verify-title">Verificación de Correo</h1>
        <p className="verify-instructions">
          Introduce el código que enviamos a tu email:
        </p>

        <div className="verify-content">
          <div className="verify-input-group">
            <input
              type="text"
              value={verificationToken}
              onChange={(e) => setVerificationToken(e.target.value)}
              placeholder="Código de verificación"
              className="glass-input"
            />
            <button
              className="glass-button"
              onClick={handleVerify}
              disabled={isVerifying}
            >
              {isVerifying ? "Verificando..." : "Verificar Cuenta"}
            </button>
          </div>

          <Link to="/login" className="link">
            {isSuccess ? "Has verificado tu cuenta, Inicia Sesión →" : "Volver a Iniciar Sesión"}
          </Link>

          {responseStatus && (
            <div className={`status-message ${isSuccess ? 'success' : 'error'}`}>
              {responseStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyMail;

