import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const PrivateRoute = ({ element }) => {
  const { currentUser } = useContext(AuthContext);
  
  return currentUser ? element : <Navigate to="/home" replace />;
};
