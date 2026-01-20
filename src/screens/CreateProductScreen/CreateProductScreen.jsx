import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthenticatedHeaders, POST } from '../../fetching/http.fetching';
import { extractFormData } from '../../utils/extractFormData';
import ENVIROMENT from '../../../enviroment';
import './CreateProduct.css';

const CreateProductScreen = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setError(null);
            setLoading(true);

            const form_HTML = e.target;
            const form_Values = new FormData(form_HTML);

            // Definir campos requeridos
            const form_fields = {
                title: '',
                price: '',
                stock: '',
                description: '',
                category: ''
            };

            const form_values_object = extractFormData(form_fields, form_Values);

            // Añadir imagen si existe (ya en base64 gracias al onChange)
            if (image) {
                form_values_object.image_base_64 = image;
            } else {
                // Imagen por defecto si no se sube ninguna
                form_values_object.image_base_64 = 'https://via.placeholder.com/300';
            }

            const response = await POST(
                `${ENVIROMENT.URL_BACKEND}/api/products`,
                {
                    headers: getAuthenticatedHeaders(),
                    body: JSON.stringify(form_values_object)
                }
            );

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => navigate('/home'), 1500); // Redirigir tras éxito
            } else {
                setError(response.message || "Error al crear producto");
            }
        } catch (error) {
            setError("Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="create-product-wrapper">
            <div className="create-product-card">
                <div className="form-header">
                    <h1 className="form-title">Nuevo Producto</h1>
                    <p className="form-subtitle">Añade un nuevo ítem a tu catálogo</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="glass-form-group">
                        <label className="glass-label" htmlFor="title">Título del Producto</label>
                        <input name="title" id="title" className="glass-input" placeholder="Ej. Auriculares Sony" required />
                    </div>

                    <div className="glass-form-group" style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label className="glass-label" htmlFor="price">Precio ($)</label>
                            <input name="price" id="price" type="number" className="glass-input" placeholder="0.00" required />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className="glass-label" htmlFor="stock">Stock</label>
                            <input name="stock" id="stock" type="number" className="glass-input" placeholder="10" required />
                        </div>
                    </div>

                    <div className="glass-form-group">
                        <label className="glass-label" htmlFor="category">Categoría</label>
                        <input name="category" id="category" className="glass-input" placeholder="Ej. Tecnología" required />
                    </div>

                    <div className="glass-form-group">
                        <label className="glass-label" htmlFor="description">Descripción</label>
                        <textarea name="description" id="description" className="glass-textarea" placeholder="Detalles del producto..."></textarea>
                    </div>

                    <div className="glass-form-group">
                        <label className="glass-label">Imagen del Producto</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChangeImage}
                            className="glass-input"
                            style={{ padding: '10px' }}
                        />
                        <div className="image-preview-container">
                            {image ? (
                                <img src={image} alt="Preview" className="image-preview" />
                            ) : (
                                <span className="no-image-text">Vista previa</span>
                            )}
                        </div>
                    </div>

                    {error && <div className="status-msg error">{error}</div>}
                    {success && <div className="status-msg success">¡Producto creado con éxito!</div>}

                    <div className="form-actions">
                        <Link to="/home" className="btn-cancel">Cancelar</Link>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Guardando...' : 'Publicar Producto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProductScreen;