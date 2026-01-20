import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GET, getAuthenticatedHeaders } from '../../fetching/http.fetching';
import ENVIROMENT from '../../../enviroment';
import './Home.css';

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
        // Minimum loading time to show off the skeleton animation (optional polish)
        const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));

        try {
            const [response] = await Promise.all([
                GET(`${ENVIROMENT.URL_BACKEND}/api/products`, { headers: getAuthenticatedHeaders() }),
                minLoadTime
            ]);

            if (response.ok) {
                const allProducts = response.payload.products;
                setProducts(allProducts);

                const userSpecificProducts = allProducts.filter(
                    (product) => product.seller_id === user_info.id
                );
                setUserProducts(userSpecificProducts);
            } else {
                console.error('Error al cargar productos:', response.message);
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

    const displayedProducts = showUserProducts ? userProducts : products;

    // Get initials for profile button
    const userInitials = user_info.name
        ? user_info.name.charAt(0).toUpperCase()
        : 'U';

    return (
        <div className="home-wrapper">
            {/* --- Floating Navbar --- */}
            <nav className="glass-navbar">
                <Link to="/home" className="logo-link">Lumina</Link>

                <div className="nav-actions">
                    <button
                        className={`nav-link ${showUserProducts ? 'active' : ''}`}
                        onClick={() => setShowUserProducts(!showUserProducts)}
                    >
                        {showUserProducts ? "Ver Todos" : "Mis Productos"}
                    </button>

                    <Link to="/product/new" className="create-btn-nav">
                        + Crear
                    </Link>

                    <Link to="/user" className="profile-btn-nav" title="Mi Perfil">
                        {userInitials}
                    </Link>

                    <button onClick={handleLogout} className="logout-icon" title="Cerrar Sesión">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </button>
                </div>
            </nav>

            {/* --- Products Grid or Skeletons --- */}
            {isLoadingProducts ? (
                <div className="products-masonry">
                    {[...Array(8)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : displayedProducts.length === 0 ? (
                <div className="loading-container">
                    <p style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '15px' }}>No hay productos disponibles.</p>
                    <Link to="/product/new" className="create-btn-nav">¡Crea el primero!</Link>
                </div>
            ) : (
                <div className="products-masonry">
                    {displayedProducts.map((product, index) => (
                        <AuroraCard
                            key={product.id}
                            {...product}
                            currentUser={user_info}
                        />
                    ))}
                </div>
            )}

            {/* --- Footer Glass --- */}
            <footer className="aurora-footer">
                <div className="footer-content">
                    <div className="footer-col">
                        <Link to="/home" className="footer-logo text-gradient">Lumina Market</Link>
                        <p className="footer-desc">
                            Explora el futuro del comercio digital con una experiencia inmersiva y segura.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-title">Plataforma</h4>
                        <ul className="footer-links">
                            <li><Link to="/home">Inicio</Link></li>
                            <li><Link to="/product/new">Vender</Link></li>
                            <li><Link to="/user">Mi Cuenta</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-title">Soporte</h4>
                        <ul className="footer-links">
                            <li><a href="#">Centro de Ayuda</a></li>
                            <li><a href="#">Términos y Condiciones</a></li>
                            <li><a href="#">Privacidad</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    &copy; 2026 Lumina Inc. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
};

/* --- Skeleton Component --- */
const SkeletonCard = () => (
    <div className="skeleton-card">
        <div className="skeleton-img"></div>
        <div className="skeleton-content">
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-line btn"></div>
        </div>
    </div>
);

/* --- Aurora Card Component V3 --- */
const AuroraCard = ({ title, price, image_base_64, id, seller_id, currentUser }) => {
    const isSeller = seller_id === currentUser.id;
    const isAdmin = currentUser.role === 'admin';

    const imageSrc = image_base_64 && image_base_64.length > 20
        ? image_base_64
        : 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

    return (
        <div className="aurora-card">
            <div className="card-image-wrap">
                <img src={imageSrc} alt={title} className="card-img" />
            </div>

            <div className="card-content">
                <div className="card-header-row">
                    <h3 className="card-title" title={title}>{title}</h3>
                </div>

                <p className="card-price">${price}</p>

                <div className="card-actions-row">
                    <Link to={`/product/${id}`} className="btn-solid-glow">
                        Ver Detalle
                    </Link>

                    {(isSeller || isAdmin) && (
                        <div className="card-admin-actions">
                            <Link to={`/product/update/${id}`} className="btn-mini-glass" title="Editar">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </Link>
                            <Link to={`/product/delete/${id}`} className="btn-mini-glass delete" title="Borrar">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
