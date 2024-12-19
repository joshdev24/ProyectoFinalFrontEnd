import React, { useState } from "react";
import { DELETE, getAuthenticatedHeaders } from "../../fetching/http.fetching";
import { useParams, Link } from "react-router-dom";
import ENVIROMENT from "../../../enviroment";
import "./DeleteProduct.css";


const DeleteProduct = () => {
    const { product_id } = useParams(); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState("");

    const handleDelete = async () => {
        setLoading(true); 
        setError(""); 

        try {
            const response = await DELETE(`${ENVIROMENT.URL_BACKEND}/api/products/${product_id}`, {
                headers: getAuthenticatedHeaders(),
                
            });

            if (response.ok) {
                setSuccess("Producto eliminado exitosamente."); 
            } else {
                const errorMessage = response.payload?.message || "Error al eliminar el producto.";
                setError(errorMessage);
            }

        } catch (err) {
            console.error("Error al eliminar el producto:", err);
            setError("Hubo un problema al eliminar el producto.");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="delete-product-container">
            <h3 className="delete-product-title">Eliminar Producto</h3>
            <p className="delete-product-message">¿Estás seguro de que quieres eliminar este producto?</p>
            {success && <p className="delete-product-success">{success}</p>}
            {error && <p className="delete-product-error">{error}</p>}
            <button
                onClick={handleDelete}
                disabled={loading}
                className={`delete-product-button ${loading ? "loading" : ""}`}
            >
                {loading ? "Eliminando..." : "Eliminar Producto"}
            </button>
            <Link to="/home" className="back-to-home-link">Regresar al inicio</Link>
            {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
            {success && <p className="success" style={{ color: 'green' }}>{success}</p>}

        </div>
    );
};


export default DeleteProduct;
