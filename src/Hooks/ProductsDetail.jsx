import { useEffect } from "react"
import { GET, getAuthenticatedHeaders } from "../fetching/http.fetching"

const useProductDetail = (product_id) =>{
    const [product_detail_state, setProductDetailState] = useState(null)
    const [product_detail_loading, setProductDetailLoading] = useState(true)
    const [product_detail_error, setProductDetailError] = useState(null)

    const getProductDetail = async (product_id) =>{
        const product_detail_response = await GET(
            `http://localhost:3000/api/products/${product_id}`, 
            {
                headers: getAuthenticatedHeaders()
            }
        )
        //Condiciones / manejo de errores de la peticion
        setProductDetailLoading(false)
        if(product_detail_response.ok){
            setProductDetailState(product_detail_response.payload.product)
        }   
        else{
            //Aca les dejo el centro para manejar los errores
            //setProductDetailError(product_detail_response.payload.error)
        }
    }

    useEffect(
        () =>{
            getProductDetail(product_id)
        },
        []
    )
    return {
        product_detail_state, 
        product_detail_loading, 
        product_detail_error
    }
}

export default useProductDetail

 //     if (!product) {
                //         console.error("useProductDetails: No se encontro el producto o hubo un error al obtenerlo");
                //         setError("No se encontro el producto o hubo un error al obtenerlo");
                //     } else {
                //         setProductDetails(product);
                //     }
                // }