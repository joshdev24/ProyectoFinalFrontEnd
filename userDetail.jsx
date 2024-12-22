import React, { useEffect, useState } from 'react';

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
    <div style={styles.card}>
      <h2 style={styles.name}>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>id:</strong> {user.id}</p>
      <p><strong>rol:</strong> {user.rol}</p>
    </div>
  );
};

// Estilos en línea (puedes usar CSS externo si prefieres)
const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '300px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
  },
  name: {
    marginBottom: '8px',
    color: '#333'
  }
};

export default UserCard;