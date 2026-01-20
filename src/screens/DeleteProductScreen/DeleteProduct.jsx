import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { DELETE, getAuthenticatedHeaders } from '../../fetching/http.fetching';
import ENVIROMENT from '../../../enviroment';
import './DeleteProduct.css';

const DeleteProduct = () => {
    const { product_id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await DELETE(
                `${ENVIROMENT.URL_BACKEND}/api/products/${product_id}`,
                { headers: getAuthenticatedHeaders() }
            );

            if (response.ok) {
                navigate('/home');
            } else {
                setError("Error al eliminar");
            }
        } catch (err) {
            setError("Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="delete-wrapper">
            <div className="delete-card">
                <div className="warning-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                </div>

                <h2 className="delete-title">¿Eliminar Producto?</h2>
                <div className="product-preview">ID: {product_id}</div>
                <p className="delete-text">Esta acción es permanente y no se puede deshacer. ¿Estás seguro?</p>

                {error && <div style={{ color: '#ff4d4d', marginBottom: '15px' }}>{error}</div>}

                <div className="delete-actions">
                    <button className="btn-secondary" onClick={() => navigate('/home')}>
                        Cancelar
                    </button>
                    <button className="btn-danger" onClick={handleDelete} disabled={loading}>
                        {loading ? 'Borrando...' : 'Sí, Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProduct;
