import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Componente funcional para mostrar información de un usuario desde sessionStorage
const UserCard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener datos del usuario desde sessionStorage
    const storedUser = sessionStorage.getItem('user_info');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p>No hay información del usuario disponible en sessionStorage.</p>;
  }

  return (
    
       <div className="product-detail">
                  <span className="user-detail-id">ID: {user.id}</span>
                  <h2 className="user-detail-title">Nombre de usuario: {user.name}</h2>
                  <div className="product-detail-price">Rol: {user.role}</div>
                  <Link to={`/home`} className="back-to-home-link">Regresar al inicio</Link> 
              </div>
  );
};




export default UserCard;