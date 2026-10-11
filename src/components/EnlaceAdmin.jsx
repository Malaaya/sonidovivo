import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function EnlaceAdmin({ className = '' }) {
  const { usuario, esAdmin } = useAuth();

  // Muestra el enlace solo si hay sesión activa y el usuario es administrador
  if (!usuario || (!esAdmin && usuario.rol !== 'admin')) {
    return null;
  }

  return (
    <Link to="/admin" className={`btn-admin-link ${className}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A7 7 0 1 1 13 16.93zM12 5a1 1 0 1 0 1 1 1 1 0 0 0-1-1z"/>
      </svg>
      Panel Admin
    </Link>
  );
}