import React, { useState, useEffect } from "react";
import { PUT, GET, getAuthenticatedHeaders } from "../../fetching/http.fetching";
import { extractFormData } from "../../utils/extractFormData";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        title: '',
        price: '',
        stock: '',
        description: '',
        category: '',
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const response = await GET(`http://localhost:3000/api/products/${id}`, {
                headers: getAuthenticatedHeaders

            });

            if (response.ok) {
                const productFromServer = await response.json();
                setProduct(productFromServer);
            } 
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            setError("Error al obtener el producto.");
        }
    };

    const handleSubmitUpdatedProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Añadir todos los campos del producto al FormData
        for (const [key, value] of Object.entries(product)) {
            formData.append(key, value);
        }

        // Añadir la imagen si existe una nueva o la que ya está guardada
        if (image) {
            formData.append("image", image);
        } else if (product?.image) {
            formData.append("image", product.image);
        }

        try {
            const response = await PUT(`http://localhost:3000/api/products/${id}`, {
                headers: 
                    getAuthenticatedHeaders(),
                body: formData,
            });
            if (response.ok) {
                console.log("Producto actualizado:", await response.json());
            } else {
                setError("Error actualizando el producto.");
            }
        } catch (error) {
            console.error("Error actualizando pruducto:", error);
            setError("Error actualizando el producto.");
        }
    };

    const handleChangeFile = (e) => {
        const file = e.target.files?.[0];
        const FILE_MB_LIMIT = 2;
        if (file && file.size > FILE_MB_LIMIT * 1024 * 1024) {
            alert(`Error: el archivo es muy grande (limite ${FILE_MB_LIMIT} MB)`);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        if (file) reader.readAsDataURL(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    return (
        <div>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmitUpdatedProduct}>
                <div>
                    <label htmlFor="titulo">Ingrese el titulo:</label>
                    <input
                        name="title"
                        id="titulo"
                        placeholder="Nombre del producto"
                        value={product?.title || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="precio">Ingrese el precio:</label>
                    <input
                        name="price"
                        id="precio"
                        value={product?.price || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="stock">Ingrese el stock:</label>
                    <input
                        name="stock"
                        id="stock"
                        value={product?.stock || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="descripcion">Ingrese la descripcion:</label>
                    <textarea
                        name="description"
                        id="descripcion"
                        value={product?.description || ''}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="category">Ingrese la categoria:</label>
                    <input
                        name="category"
                        id="category"
                        value={product?.category || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    {(image || product?.image) && <img src={image || product?.image} alt="Producto" />}
                    <label htmlFor="imagen">Seleccione una imagen:</label>
                    <input
                        name="imagen"
                        id="imagen"
                        type="file"
                        onChange={handleChangeFile}
                        accept="image/*"
                    />
                </div>
                <button type="submit">Actualizar producto</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
