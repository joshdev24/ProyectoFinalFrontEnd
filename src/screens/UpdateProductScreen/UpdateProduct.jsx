import React, { useState, useEffect } from "react";
import { PUT, GET, getAuthenticatedHeaders } from "../../fetching/http.fetching";
import { extractFormData } from "../../utils/extractFormData";
import { Link, useNavigate, useParams } from "react-router-dom";
import ENVIROMENT from "../../../enviroment";


const UpdateProduct = () => {
    const {_id } = useParams();
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

    const navigate = useNavigate();

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/products/${_id}`, {
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
            description: ''
        };
        const form_values_object = extractFormData(form_fields, form_Values);

        
        form_values_object.image = image;

       
        if (!form_values_object.title || !form_values_object.price || !form_values_object.stock || !form_values_object.description) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await PUT(`${ENVIROMENT.URL_BACKEND}/api/products/${_id}`, {
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
        <div className="form-container">
    <form className="product-form" onSubmit={handleSubmitUpdatedProduct}>
        <div className="form-group">
            <label htmlFor="titulo" className="form-label">Ingrese el título:</label>
            <input
                name="title"
                id="titulo"
                className="form-input"
                placeholder="Nombre del producto"
                value={product.title}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="precio" className="form-label">Ingrese el precio:</label>
            <input
                name="price"
                id="precio"
                className="form-input"
                value={product.price}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="stock" className="form-label">Ingrese el stock:</label>
            <input
                name="stock"
                id="stock"
                className="form-input"
                value={product.stock}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="descripcion" className="form-label">Ingrese la descripción:</label>
            <textarea
                name="description"
                id="descripcion"
                className="form-textarea"
                value={product.description}
                onChange={handleInputChange}
                required
            ></textarea>
        </div>
        <div className="form-group">
            {(image || product?.image) && (
                <img src={image || product?.image} alt="Producto" className="form-image" />
            )}
            <label htmlFor="imagen" className="form-label-file">Click aqui para subir la imagen</label>
            <input
                name="imagen"
                id="imagen"
                type="file"
                className="form-file"
                onChange={handleChangeFile}
                accept="image/*"
                required
            />
        </div>
        <button type="submit" className="form-button" disabled={loading}>
            {loading ? 'Actualizando...' : 'Actualizar producto'}
        </button>
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}
    </form>
    <Link to={`/home`} className="back-to-home-link">Regresar al inicio</Link>
</div>
    );
};

export default UpdateProduct; 