
import { GET, getUnnauthenticatedHeaders } from "../fetching/http.fetching";
import {  useState } from "react";
import ENVIROMENT from "../../enviroment";
import { useNavigate } from "react-router-dom";


const VerifyMail = () => {
  const [verificationToken, setVerificationToken] = useState(""); // Estado para el token ingresado por el usuario
  const [responseStatus, setResponseStatus] = useState(null); // Estado para el resultado de la verificación
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate(); // Estado para el proceso de verificación

  const handleVerify = async () => {
    setIsVerifying(true); // Indica que se está procesando
    setResponseStatus(null); // Limpia cualquier mensaje previo

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
        setResponseStatus("¡Correo verificado! Ahora puedes iniciar sesión.");
        navigate("/login");
      } else {
        setResponseStatus(
          `Error al verificar tu correo. Código de error: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error en la verificación de correo", error);
      setResponseStatus(
        error.message ? error.message : "Error al verificar el correo"
      );
    } finally {
      setIsVerifying(false); // Finaliza el proceso
    }
  };

  return (
    <div>
      <h1>Verificación de Correo</h1>
      <p>Por favor, introduce tu código de verificación:</p>
      <input
        type="text"
        value={verificationToken}
        onChange={(e) => setVerificationToken(e.target.value)}
        placeholder="Código de verificación"
        className="verification-input"
      />
      <button onClick={handleVerify} disabled={isVerifying}>
        {isVerifying ? "Verificando..." : "Verificar"}
      </button>
      {responseStatus && <h2>{responseStatus}</h2>}
    </div>
  );
};

export default VerifyMail;
