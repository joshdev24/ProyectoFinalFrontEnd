import React, { useState, useEffect } from "react";
import { PUT, GET, getAuthenticatedHeaders } from "../../fetching/http.fetching";
import { extractFormData } from "../../utils/extractFormData";
import { Link, useParams } from "react-router-dom";
import ENVIROMENT from "../../../enviroment";

const UpdateProduct = (product_id) => {
    const { product_id } = useParams();
    const [product, setProduct] = useState({
        title: '',
        price: '',
        stock: '',
        description: '',
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
        <div>
            <form onSubmit={handleSubmitUpdatedProduct}>
                <div>
                    <label htmlFor="titulo">Ingrese el titulo:</label>
                    <input
                        name="title"
                        id="titulo"
                        placeholder="Nombre del producto"
                        value={product.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="precio">Ingrese el precio:</label>
                    <input
                        name="price"
                        id="precio"
                        value={product.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="stock">Ingrese el stock:</label>
                    <input
                        name="stock"
                        id="stock"
                        value={product.stock}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                <label htmlFor="descripcion">Ingrese la descripcion:</label>
                    <textarea
                        name="description"
                        id="descripcion"
                        value={product.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div>
                    {(image || product?.image) && <img src={image || product?.image} alt="Producto" />}
                    <label htmlFor="imagen">Seleccione una imagen:</label>
                    <input
                        name="imagen"
                        id="imagen"
                        type="file"
                        onChange={handleChangeFile}
                        accept="image/*"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Actualizando...' : 'Actualizar producto'}
                </button>
                {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
            {success && <p className="success" style={{ color: 'green' }}>{success}</p>}
            </form>
            <Link to={`/home`} className="back-to-home-link">Regresar al inicio</Link>

        </div>
    );
};

export default UpdateProduct; 