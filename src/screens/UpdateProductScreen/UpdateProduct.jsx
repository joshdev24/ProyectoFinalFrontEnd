import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuthenticatedHeaders, PUT, GET } from '../../fetching/http.fetching';
import { extractFormData } from '../../utils/extractFormData';
import ENVIROMENT from '../../../enviroment';
import '../CreateProductScreen/CreateProduct.css'; // Reusing styles

const UpdateProduct = () => {
    const { product_id } = useParams();
    const navigate = useNavigate();

    // States
    const [existingData, setExistingData] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true); // Loading initial data
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Fetch existing product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await GET(
                    `${ENVIROMENT.URL_BACKEND}/api/products/${product_id}`,
                    { headers: getAuthenticatedHeaders() }
                );

                if (response.ok) {
                    setExistingData(response.payload.product);
                    setImage(response.payload.product.image_base_64);
                } else {
                    setError("No se pudo cargar el producto");
                }
            } catch (err) {
                setError("Error de conexión");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [product_id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const form_HTML = e.target;
            const form_Values = new FormData(form_HTML);

            const form_fields = {
                title: '',
                description: '',
                price: '',
                stock: '',
                category: ''
            };

            const form_values_object = extractFormData(form_fields, form_Values);

            // Si la imagen cambió (es diferente a la original), actualizarla.
            // Si no, podríamos mantener la vieja, pero PUT suele reemplazar todo.
            // Asumimos que enviamos la imagen actual (sea nueva o vieja)
            form_values_object.image_base_64 = image;

            const response = await PUT(
                `${ENVIROMENT.URL_BACKEND}/api/products/${product_id}`,
                {
                    headers: getAuthenticatedHeaders(),
                    body: JSON.stringify(form_values_object)
                }
            );

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => navigate('/home'), 1500);
            } else {
                setError(response.message || "Error al actualizar");
            }
        } catch (err) {
            setError("Error al enviar formulario");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="create-product-wrapper">
            <div style={{ color: 'white' }}>Cargando datos del producto...</div>
        </div>
    );

    if (!existingData) return (
        <div className="create-product-wrapper">
            <div className="status-msg error">Producto no encontrado</div>
            <Link to="/home" className="btn-cancel" style={{ marginTop: '20px' }}>Volver</Link>
        </div>
    );

    return (
        <div className="create-product-wrapper">
            <div className="create-product-card">
                <div className="form-header">
                    <h1 className="form-title">Editar Producto</h1>
                    <p className="form-subtitle">Actualiza los detalles de tu publicación</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="glass-form-group">
                        <label className="glass-label" htmlFor="title">Título</label>
                        <input
                            name="title"
                            id="title"
                            className="glass-input"
                            defaultValue={existingData.title}
                            required
                        />
                    </div>

                    <div className="glass-form-group" style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label className="glass-label" htmlFor="price">Precio ($)</label>
                            <input
                                name="price"
                                id="price"
                                type="number"
                                className="glass-input"
                                defaultValue={existingData.price}
                                required
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className="glass-label" htmlFor="stock">Stock</label>
                            <input
                                name="stock"
                                id="stock"
                                type="number"
                                className="glass-input"
                                defaultValue={existingData.stock}
                                required
                            />
                        </div>
                    </div>

                    <div className="glass-form-group">
                        <label className="glass-label" htmlFor="category">Categoría</label>
                        <input
                            name="category"
                            id="category"
                            className="glass-input"
                            defaultValue={existingData.category}
                            required
                        />
                    </div>

                    <div className="glass-form-group">
                        <label className="glass-label" htmlFor="description">Descripción</label>
                        <textarea
                            name="description"
                            id="description"
                            className="glass-textarea"
                            defaultValue={existingData.description}
                        ></textarea>
                    </div>

                    <div className="glass-form-group">
                        <label className="glass-label">Imagen</label>
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
                                <span className="no-image-text">Sin imagen</span>
                            )}
                        </div>
                    </div>

                    {error && <div className="status-msg error">{error}</div>}
                    {success && <div className="status-msg success">¡Actualizado correctamente!</div>}

                    <div className="form-actions">
                        <Link to="/home" className="btn-cancel">Cancelar</Link>
                        <button type="submit" className="btn-submit" disabled={submitting}>
                            {submitting ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;