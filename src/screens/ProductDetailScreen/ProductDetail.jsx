import React from 'react';
import { useParams } from 'react-router-dom';
import useProductDetails from '../../Hooks/ProductsDetail';

const ProductDetails = () => {
    const { product_id } = useParams();
    const user_info = JSON.parse(sessionStorage.getItem('user_info'));
    const { productDetails, isLoadingProducts, error } = useProductDetails(product_id);

    
    if (!user_info || !user_info.name) {
        return <p>Please log in to view product details.</p>;
    }

    
    if (error) {
        return <p>{error}</p>;
    }

    
    if (isLoadingProducts) {
        return <h1>Loading...</h1>;
    }

    
    if (productDetails) {
        return (
            <>
                <img 
                    src={productDetails.image } 
                    style={{ width: '200px' }} 
                    alt={productDetails.title } 
                />
                <div>Description: {productDetails.description }</div>
                <div>Price: ${productDetails.price }</div>
                <div>Stock: {productDetails.stock }</div>
                <div>Category: {productDetails.category}</div>
            </>
        );
    }

    return <p>Product not found.</p>;
};

export default ProductDetails;
