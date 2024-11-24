import React, { useState,  } from 'react';
import { getAuthenticatedHeaders, POST } from '../../fetching/http.fetching';
import { extractFormData } from '../../utils/extractFormData';
import './CreateProduct.css';
import { Link } from 'react-router-dom';
import ENVIROMENT from '../../../enviroment';

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
            category: ''
        };
        const form_values_object = extractFormData(form_fields, form_Values);

        
        form_values_object.image = image;

       
        if (!form_values_object.title || !form_values_object.price || !form_values_object.stock || !form_values_object.description || !form_values_object.category) {
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
                setError(errorData.message || 'Error al crear el producto'); 
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
        <div>
            <form onSubmit={handleSubmitNewProduct}>
                <div>
                    <label htmlFor='titulo'>Ingrese el titulo:</label>
                    <input name='title' id='titulo'  required />
                </div>
                <div>
                    <label htmlFor='precio'>Ingrese el precio:</label>
                    <input name='price' id='precio' required />
                </div>
                <div>
                    <label htmlFor='stock'>Ingrese el stock:</label>
                    <input name='stock' id='stock' required />
                </div>
                <div>
                    <label htmlFor='descripcion'>Ingrese la descripcion:</label>
                    <textarea name="description" id="descripcion" required></textarea>
                </div>
                <div>
                    <label htmlFor='category'>Ingrese la categoria:</label>
                    <input name='category' id='category' required />
                </div>
                <div>
                    {image && <img src={image} alt="Selected" />}
                    <label htmlFor='imagen'>Seleccione una imagen:</label>
                    <input name='imagen' id='imagen' type='file' onChange={handleChangeFile} accept='image/*' />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} 
				{success && <p style={{ color: 'green' }}>{success}</p>}
                <button type='submit' disabled={loading}>{loading ? 'Creating...' : 'Crear producto'}</button>
                <Link to={`/home`} className="back-to-home-link">Regresar al inicio</Link>
            </form>
        </div>
       </>
    );
};

export default CreateProductScreen;