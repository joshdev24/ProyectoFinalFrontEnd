import { useParams } from "react-router-dom";
import { GET, getUnnauthenticatedHeaders } from "../fetching/http.fetching";
import { useEffect, useState } from "react";
import ENVIROMENT from "../../enviroment";

export const VerifyMail = () => {
  const { verificationToken } = useParams();

  const [responseStatus, setResponseStatus] = useState(null);
  
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!verificationToken) {
          throw new Error("No se ha proporcionado un token de verificación");
        }

        console.log(
          `Solicitud de verificación de correo: ${ENVIROMENT.URL_BACKEND}/api/auth/verify/${verificationToken}`
        );

        const response = await GET(
          `${ENVIROMENT.URL_BACKEND}/api/auth/verify/${verificationToken}`,
          {
            headers: getUnnauthenticatedHeaders(),
          }
        );

        if (!response) {
          throw new Error("No se ha recibido respuesta alguna");
        }

        console.log("Respuesta de verificación de correo:", response);
        if (response.status === 200) {
          setResponseStatus("Verificado!!! Anda a loguearte!!");
        } else {
          setResponseStatus(
            `Error al verificar tu correo. Codigo de error: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error en la verificación de correo", error);
        setResponseStatus(
          error.message ? error.message : "Error al verificar el correo"
        );
      }
    };

    verifyEmail();
  }, [verificationToken]);

  return (
    <div>
      {responseStatus ? <h2>{responseStatus}</h2> : <h2>Verificando...</h2>}
    </div>
  );
};
