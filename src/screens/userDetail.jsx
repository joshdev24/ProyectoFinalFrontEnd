import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './userDetail.css';

const UserCard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
   
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
                  <h2 className="user-detail-id">ID: {user.id}</h2>
                  <h2 className="user-detail-email">Email: {user.email}</h2>
                  <h2 className="user-detail-title">Nombre de usuario: {user.name}</h2>
                  <div className="user-detail-role">Rol: {user.role}</div>
                  <Link to={`/home`} className="back-to-home-link">Regresar al inicio</Link> 
              </div>
  );
};




export default UserCard;