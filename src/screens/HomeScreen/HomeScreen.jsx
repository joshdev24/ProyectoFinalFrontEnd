<<<<<<< HEAD
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../../Hooks/UseProducts';
import './Home.css';
// Hook para obtener productos
=======
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuthContext} from "./../../Context/AuthContext";
import './Home.css';
import { GET, getAuthenticatedHeaders } from '../../fetching/http.fetching';
import ENVIROMENT from '../../../enviroment';
>>>>>>> 1b0091d92a0239d4a8bf97a875bbe4f3ddc90e67

const getUserInfo = () => {
    try {
        return JSON.parse(sessionStorage.getItem('user_info')) || {};
    } catch {
        return {};
    }
};

const HomeScreen = () => {
<<<<<<< HEAD
    const user_info = getUserInfo();
    const { products, isLoadingProducts } = useProducts();
=======
    const navigate = useNavigate();
    const user_info = getUserInfo();
    const [products, setProducts] = useState([]);
    const [userProducts, setUserProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [showUserProducts, setShowUserProducts] = useState(false);
    const {logOut} = useAuthContext();

    const getProducts = async () => {
        try {
            const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/products`, {
                headers: getAuthenticatedHeaders(),
                mode: "no-cors",
            });

            if (response.ok) {
                const allProducts = response.payload.products;
                setProducts(allProducts);

                // Filtrar productos del usuario actual
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

    

    useEffect(() => {
        getProducts();
    }, []);
>>>>>>> 1b0091d92a0239d4a8bf97a875bbe4f3ddc90e67

    return (
        <div className="home-container">
            {user_info.name ? (
                <>
                    <h1 className="welcome-title">Bienvenido {user_info.name}</h1>
<<<<<<< HEAD
                    <Link to="/product/new" className="create-product-link">
                        Crear producto
                    </Link>
                    {isLoadingProducts ? (
                        <span className="loading-text">Cargando...</span>
=======
                    <div className="header-actions">
                        <Link to="/product/new" className="create-product-link">
                            Crear producto
                        </Link>
                        <button
                            className="logout-button"
                            onClick={logOut}
                        >
                            Cerrar sesión
                        </button>
                    
                    <button
                        className="filter-user-products-button"
                        onClick={() => setShowUserProducts(!showUserProducts)}
                    >
                    
                        {showUserProducts ? 'Ver todos los productos' : 'Ver mis productos'}
                    </button>    
                    </div>
                   
                    {isLoadingProducts ? (
                        <span className="loading-text">Cargando...</span>
                    ) : showUserProducts ? (
                        <ProductsList products={userProducts} />
>>>>>>> 1b0091d92a0239d4a8bf97a875bbe4f3ddc90e67
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
    if (!products.length) {
        return <p className="no-products-message">No hay productos disponibles.</p>;
    }

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
<<<<<<< HEAD
                alt={`Imagen del producto ${title}`}
=======
                alt={`Imagen de ${title}`}
>>>>>>> 1b0091d92a0239d4a8bf97a875bbe4f3ddc90e67
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
