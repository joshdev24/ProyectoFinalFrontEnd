import React, { useState, useEffect } from "react";
import { PUT, GET, getAuthenticatedHeaders } from "../../fetching/http.fetching";
import { extractFormData } from "../../utils/extractFormData";
import { Link, useParams } from "react-router-dom";
import ENVIROMENT from "../../../enviroment";
import "./UpdateProduct.css";

const UpdateProduct = () => {
    const { product_id } = useParams();
    const [product, setProduct] = useState({
        title: '',
        price: '',
        stock: '',
        description: '',
        image: '',

    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/products/${product_id}`, {
                headers: getAuthenticatedHeaders()
            });

            if (response.ok) {
                const productFromServer = response.payload.product;
                setProduct(productFromServer);
            } else {
                setError("Error al obtener el producto.");
            }
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            setError("Error al obtener el producto.");
        }
    };
    

    const handleSubmitUpdatedProduct = async (e) => {
        e.preventDefault();
        setLoading(true); 
        setError(''); 

        const form_HTML = e.target;
        const form_Values = new FormData(form_HTML);
        const form_fields = {
            title: '',
            price: '',
            stock: '',
            description: '',
            image: '',

    
        };
        const form_values_object = extractFormData(form_fields, form_Values);

        
        form_values_object.image = image;

       
        if (!form_values_object.title || !form_values_object.price || !form_values_object.stock || !form_values_object.description) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await PUT(`${ENVIROMENT.URL_BACKEND}/api/products/${product_id}`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(form_values_object),
            });

            if (response.ok) {
                setSuccess("Producto actualizado correctamente.");
            } else {
                setError("Error actualizando el producto.");
            }
        } catch (error) {
            console.error("Error actualizando producto:", error);
            setError("Error actualizando el producto.");
        } finally {
            setLoading(false); 
        }
        console.log(form_values_object);
    };

    

    const handleChangeFile = (e) => {
        const file = e.target.files?.[0];
        const FILE_MB_LIMIT = 2;
        if (file && file.size > FILE_MB_LIMIT * 1024 * 1024) {
            setError(`Error: el archivo es muy grande (limite ${FILE_MB_LIMIT} MB)`);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        if (file) reader.readAsDataURL(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    return (
        <div className="create-product-container">
            <form className="create-product-form" onSubmit={handleSubmitUpdatedProduct}>
                <div className="form-group">
                    <label className="form-label" htmlFor="titulo">Ingrese el título:</label>
                    <input className="form-input" 
                    name="title" 
                    id="titulo" required  
                    value={product.title} 
                    onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="precio">Ingrese el precio:</label>
                    <input className="form-input" 
                    name="price" id="precio" required 
                    value={product.price} 
                    onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="stock">Ingrese el stock:</label>
                    <input className="form-input" 
                    name="stock" 
                    id="stock" required 
                    value={product.stock} 
                    onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="descripcion">Ingrese la descripción:</label>
                    <textarea className="form-textarea" 
                    name="description" 
                    id="descripcion" required 
                    value={product.description} 
                    onChange={handleInputChange}></textarea>
                </div>
                <div className="form-group">
                    {image && <img className="selected-image" src={image} alt="Selected" />}
                    <label className="form-label" htmlFor="image">Seleccione una imagen:</label>
                    <input
                        className="form-input-file"
                        name="image"
                        id="image"
                        type="file"
                        required
                        value={product.image}
                        onChange={handleChangeFile}
                        accept="image/*"
                    />
                </div>
                {error && <p className="error-message">{error}</p>} 
                {success && <p className="success-message">{success}</p>}
                <button
                    className="create-button"
                    type="submit"
                    disabled={loading}>
                    {loading ? 'Actualizando...' : 'Actualizar producto'}
                </button>
                <Link to={`/home`} className="back-to-home-button">Regresar al inicio</Link>
            </form>
        </div>
    );
};

export default UpdateProduct; 