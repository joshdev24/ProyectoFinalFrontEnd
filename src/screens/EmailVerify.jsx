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
        const response = await GET(
          `${ENVIROMENT.URL_BACKEND}/api/auth/verify/${verificationToken}`,
          {
            headers: getUnnauthenticatedHeaders(),
          }
        );

        if (response && response.ok) {
          setResponseStatus("Verificado!!! Anda a loguearte!!😊🙌👌👍❤️");
        } else {
          setResponseStatus("Error al verificar tu correo.");
        }
        console.log(response);
      } catch (error) {
        console.error("Error en la verificación de correo", error);
        setResponseStatus("Hubo un error al verificar el correo.");
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