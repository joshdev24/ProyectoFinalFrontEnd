import React, { useState,  } from 'react';
import { getAuthenticatedHeaders, POST } from '../../fetching/http.fetching';
import { extractFormData } from '../../utils/extractFormData';
import './CreateProduct.css';
import { Link } from 'react-router-dom';
import ENVIROMENT from "../../../enviroment";

const CreateProductScreen = () => {
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmitNewProduct = async (e) => {
        e.preventDefault();
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

       
        if (!form_values_object.title || !form_values_object.price || !form_values_object.stock || !form_values_object.description ) {
            setError('All fields are required.');
            return;
        }

        setLoading(true); 

        try {
            const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/products`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(form_values_object)
            });

            if (!response.ok) {
                setError('Error al crear el producto'); 
            } 
			setSuccess('Se ha creado el producto con exito');
        } catch (error) {
            console.error(error);
            setError('Error inesperado'); 
        } finally {
            setLoading(false); 
        }
    };

    const handleChangeFile = (evento) => {
        const file_found = evento.target.files[0];
        const FILE_MB_LIMIT = 2;

        if (file_found && file_found.size > FILE_MB_LIMIT * 1024 * 1024) {
            setError(`Error: The file is too large (limit ${FILE_MB_LIMIT} MB)`);
            return; 
        }

        const lector_archivos = new FileReader();

        lector_archivos.onloadend = () => {
            console.log('File loading completed');
            setImage(lector_archivos.result);
        };

        if (file_found) {
            lector_archivos.readAsDataURL(file_found);
        }
    };

    return (
        <>
        <div className="create-product-container">
    <form className="create-product-form" onSubmit={handleSubmitNewProduct}>
        <div className="form-group">
            <label className="form-label" htmlFor="titulo">Ingrese el título:</label>
            <input className="form-input" name="title" id="titulo" required />
        </div>
        <div className="form-group">
            <label className="form-label" htmlFor="precio">Ingrese el precio:</label>
            <input className="form-input" name="price" id="precio" required />
        </div>
        <div className="form-group">
            <label className="form-label" htmlFor="stock">Ingrese el stock:</label>
            <input className="form-input" name="stock" id="stock" required />
        </div>
        <div className="form-group">
            <label className="form-label" htmlFor="descripcion">Ingrese la descripción:</label>
            <textarea className="form-textarea" name="description" id="descripcion" required></textarea>
        </div>
        <div className="form-group">
            {image && <img className="selected-image" src={image} alt="Selected" />}
            <label className="form-label" htmlFor="imagen">Seleccione una imagen:</label>
            <input
                className="form-input-file"
                name="imagen"
                id="imagen"
                type="file"
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
            {loading ? 'Creating...' : 'Crear producto'}
        </button>
        <Link to={`/home`} className="back-to-home-link">Regresar al inicio</Link>
    </form>
</div>

       </>
    );
};

export default CreateProductScreen;