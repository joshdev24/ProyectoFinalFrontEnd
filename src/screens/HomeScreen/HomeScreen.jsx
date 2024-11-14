import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GET } from '../../fetching/http.fetching';
import useProducts from '../../Hooks/UseProducts';

const HomeScreen = () => {
    const user_info = JSON.parse(sessionStorage.getItem('user_info')) || {};
    const { products, isLoadingProducts } = useProducts();

    return (
        <div>
            {user_info.name ? (
                <>
                    <h1>Bienvenido {user_info.name}</h1>
                    <Link to={'/product/new'}>Crear producto</Link>
                    {isLoadingProducts ? (
                        <span>Cargando....</span>
                    ) : (
                        <ProductsList products={products} />
                    )}
                </>
            ) : (
                <p>Por favor, inicie sesión para ver los productos.</p>
            )}
        </div>
    );
};

const ProductsList = ({ products }) => {
    return (
        <div>
            {products.map((product) => (
                <Product key={product.id} {...product} />
            ))}
        </div>
    );
};

const Product = ({ title, price, stock, description, image, id }) => {
    return (
        <div>

            <h2>{title}</h2>
            {image && <img src={image_base_64} width={200} />}
            <p>Precio: ${price}</p>
            <Link to={`/product/${id}`}>Ir a detalle</Link>
            <hr />
            <Link to={`/product/update/:product_id`}>Actualizar Producto </Link>
        </div>
    );
};

export default HomeScreen;
