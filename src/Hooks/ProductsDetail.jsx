import { useEffect, useState } from "react"
import { GET, getAuthenticatedHeaders } from "../fetching/http.fetching"
import ENVIROMENT from "../../enviroment"


const useProductDetail = (product_id) =>{
    const [product_detail_state, setProductDetailState] = useState(null)
    const [product_detail_loading, setProductDetailLoading] = useState(true)
    const [product_detail_error, setProductDetailError] = useState(null)
    const getProductDetail = async (product_id) =>{
        const product_detail_response = await GET(
            `${ENVIROMENT.URL_BACKEND}/api/products/${product_id}`, 
            {
                headers: getAuthenticatedHeaders()
            }
        )

       
        setProductDetailLoading(false)
        if(product_detail_response.ok){
            setProductDetailState(product_detail_response.payload.product)
        }   
        else{
           
            setProductDetailError(product_detail_response.payload.detail)
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

    