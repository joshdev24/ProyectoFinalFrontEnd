import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const user_info = getUserInfo();
    const [products, setProducts] = useState([]);
    const [userProducts, setUserProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [showUserProducts, setShowUserProducts] = useState(false);

    const getProducts = async () => {
        try {
            const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/products`, {
                headers: getAuthenticatedHeaders(),
            });

            if (response.ok) {
                const allProducts = response.payload.products;
                setProducts(allProducts);

                
                const userSpecificProducts = allProducts.filter(
                    (product) => product.seller_id === user_info.id
                );
                setUserProducts(userSpecificProducts);
            } else {
                console.error('Error al cargar los productos:', response.message);
            }
        } catch (error) {
            console.error('Error de red:', error);
        } finally {
            setIsLoadingProducts(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user_info');
        
        navigate('/login');
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="home-container">
            {user_info.name ? (
                <>
                    <h1 className="welcome-title">Bienvenido {user_info.name}</h1>
                    <div className="header-actions">
                        <Link to="/product/new" className="create-product-button">
                            Crear producto
                        </Link>
                        <button className="logout-button" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                        <button
                            className="filter-user-products-button"
                            onClick={() => setShowUserProducts(!showUserProducts)}
                        >
                            {showUserProducts ? "Ver todos los productos" : "Ver mis productos"}
                        </button>
                    </div>
                    {isLoadingProducts ? (
                        <span className="loading-text">Cargando...</span>
                    ) : showUserProducts ? (
                        <ProductsList products={userProducts} />
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


const Product = ({ title, price, image_base_64, id, seller_id, userId }) => {
    const isSeller = seller_id === userId;

    return (
        <div className="product-card">
            <h2 className="product-title">{title}</h2>
            <img
                src={image_base_64}
                alt={`Imagen de ${title}`}
                className="product-image"
            />
            <p className="product-price">Precio: ${price}</p>
            <Link to={`/product/${id}`} className="product-detail-link">
                Ver detalles del producto
            </Link>

            {isSeller && (
                <>
                    <Link to={`/product/update/${id}`} className="product-update-link">
                        Actualizar Producto
                    </Link>

                    <Link to={`/product/delete/${id}`} className="product-delete-link">
                        Borrar Producto
                    </Link>
                </>
            )}
        </div>
    );
};
export default HomeScreen;

