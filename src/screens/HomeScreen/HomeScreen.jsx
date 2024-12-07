import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import { GET, getAuthenticatedHeaders } from '../../fetching/http.fetching';
import ENVIROMENT from '../../../enviroment';

const getUserInfo = () => {
    try {
        return JSON.parse(sessionStorage.getItem('user_info')) || {};
    } catch {
        return {};
    }
};

const HomeScreen = () => {
    const user_info = getUserInfo();
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);

    const getProducts = async () => {
        try {
            const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/products`, {
                headers: getAuthenticatedHeaders(),
            });

            if (response.ok) {
                setProducts(response.payload.products);
            } else {
                console.error('Error al cargar los productos:', data.message);
            }
        } catch (error) {
            console.error('Error de red:', error);
        } finally {
            setIsLoadingProducts(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="home-container">
            {user_info.name ? (
                <>
                    <h1 className="welcome-title">Bienvenido {user_info.name}</h1>
                    <Link to="/product/new" className="create-product-link">
                        Crear producto
                    </Link>
                    {isLoadingProducts ? (
                        <span className="loading-text">Cargando...</span>
                    ) : (
                        <ProductsList products={products} />
                    )}
                </>
            ) : (
                <p className="login-message">
                    Por favor, inicie sesión para ver los productos.
                </p>
            )}
        </div>
    );
};

const ProductsList = ({ products }) => {
    return (
        <div className="products-list">
            {products.map((product) => (
                <Product key={product.id} {...product} />
            ))}
        </div>
    );
};

const Product = ({ title, price, image_base_64, id }) => {
    return (
        <div className="product-card">
            <h2 className="product-title">{title}</h2>
            <img
                src={image_base_64}
                className="product-image"
            />
            <p className="product-price">Precio: ${price}</p>
            <Link to={`/product/${id}`} className="product-detail-link">
                Ver detalles del producto
            </Link>
            <hr />
            <Link to={`/product/update/${id}`} className="product-update-link">
                Actualizar Producto
            </Link>
            <Link to={`/product/delete/${id}`} className="product-update-link">
                Borrar Producto
            </Link>
        </div>
    );
};


export default HomeScreen;
