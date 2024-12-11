import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GET, getAuthenticatedHeaders } from "../fetching/http.fetching"
import ENVIROMENT from "../../enviroment"


const useProductDetail = (product_id) => {
    const [product_detail_state, setProductDetailState] = useState(null);
    const [product_detail_loading, setProductDetailLoading] = useState(true);
    const [product_detail_error, setProductDetailError] = useState(null);

    const getProductDetail = async () => {
        try {
            const product_detail_response = await GET(
                `${ENVIROMENT.URL_BACKEND}/api/products/${product_id}`,
                {
                    headers: getAuthenticatedHeaders(),
                    mode: "no-cors",
                }
            );

            setProductDetailLoading(false);

            if (product_detail_response.ok) {
                setProductDetailState(product_detail_response.payload?.product || {});
            } else {
                setProductDetailError(product_detail_response.payload?.detail || "Error desconocido");
    
            }
        } catch (error) {
            setProductDetailLoading(false);
            setProductDetailError("Error de red: " + (error.message || "Error desconocido"));
        }
    };

    useEffect(() => {
        if (product_id) {
            getProductDetail();
        } else {
            setProductDetailLoading(false);
            setProductDetailError("ID de producto no proporcionado");
        }
    }, [product_id]);

    return {
        product_detail_state,
        product_detail_loading,
        product_detail_error
    };
};


export default useProductDetail

    