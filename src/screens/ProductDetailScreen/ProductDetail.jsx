import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';
import useProductDetail from '../../Hooks/ProductsDetail';

const DetailProductScreen = () => {
    const { product_id } = useParams();
    const { product_detail_state, product_detail_loading, product_detail_error } = useProductDetail(product_id);
    return (
        <div className="detail-product-screen">
            <h2 className="detail-product-title">Detalle del Producto</h2>
            {product_detail_loading ? (
                <h2 className="detail-product-loading">Cargando...</h2>
            ) : product_detail_error ? (
                <h2 className="detail-product-error">{product_detail_error}</h2>
            ) : (
                <ProductDetail {...product_detail_state} />
            )}
        </div>
    );
};

const ProductDetail = ({ title, price, stock, description, image_base_64, id }) => {
    return (
      <>
     
        <div className="product-detail">
            <span className="product-detail-id">ID: {id}</span>
            <h2 className="product-detail-title">{title}</h2>
            <img
                className="product-image"
                src={image_base_64}
            />
            <div className="product-detail-price">Precio: ${price}</div>
            <div className="product-detail-stock">Stock: {stock}</div>
            <div className="product-detail-description">Descripción: {description}</div>
            <Link to={`/home`} className="back-to-home-link">Regresar al inicio</Link> 
        </div>
         

        </>
    );
};

export default DetailProductScreen;