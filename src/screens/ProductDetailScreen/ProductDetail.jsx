import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';
import useProductDetail from '../../Hooks/ProductsDetail';

const DetailProductScreen = () => {
    const { product_id } = useParams();
    const { product_detail_state, product_detail_loading, product_detail_error } = useProductDetail(product_id);

    return (
        <div className="product-detail-container">
            {product_detail_loading ? (
                <div className="glass-panel" style={{ padding: '40px' }}>
                    <h2 className="text-gradient">Cargando detalles...</h2>
                </div>
            ) : product_detail_error ? (
                <div className="glass-panel" style={{ padding: '40px', borderColor: 'var(--aurora-2)' }}>
                    <h2 style={{ color: 'var(--aurora-2)' }}>{product_detail_error}</h2>
                    <br />
                    <Link to="/home" className="glass-button">Volver al inicio</Link>
                </div>
            ) : (
                <ProductDetail {...product_detail_state} />
            )}
        </div>
    );
};

const ProductDetail = ({ title, price, stock, description, image_base_64, id }) => {
    return (
        <div className="product-detail-card glass-panel">
            <div className="product-image-wrapper">
                <img
                    className="product-image"
                    src={image_base_64 || 'https://via.placeholder.com/400'}
                    alt={title}
                />
            </div>

            <div className="product-info-wrapper">
                <div className="product-header">
                    <span className="product-id-badge">ID: {id}</span>
                    <h1 className="product-title">{title}</h1>
                    <div className="product-price">${price}</div>
                </div>

                <div className="product-stock">
                    <span className="stock-indicator"></span>
                    <span>Stock disponible: {stock}</span>
                </div>

                <div className="product-description-box">
                    <span className="product-description-label">Descripción</span>
                    <p className="product-description-text">{description}</p>
                </div>

                <div className="back-link-wrapper">
                    <Link to="/home" className="glass-button">
                        ← Regresar al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DetailProductScreen;