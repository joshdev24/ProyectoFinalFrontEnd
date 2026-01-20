import React from 'react';
import { Link } from 'react-router-dom';
import './userDetail.css';

const UserCard = () => {
  // Get user from session
  const userInfo = JSON.parse(sessionStorage.getItem('user_info')) || {
    name: 'Invitado',
    email: 'invitado@ejemplo.com',
    role: 'visitor'
  };

  // Get initials
  const initials = userInfo.name
    ? userInfo.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : '?';

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-avatar">
          {initials}
        </div>

        <h1 className="profile-name">{userInfo.name}</h1>
        <p className="profile-email">{userInfo.email}</p>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{userInfo.role === 'admin' ? 'Admin' : 'Usuario'}</span>
            <span className="stat-label">Rol</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">Activo</span>
            <span className="stat-label">Estado</span>
          </div>
        </div>

        <Link to="/home" className="btn-home">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default UserCard;