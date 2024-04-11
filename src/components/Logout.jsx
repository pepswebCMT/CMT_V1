import React from 'react';
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); 
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };
  return (
    <div onClick={handleLogout}>
      <FiLogOut />
    </div>
  );
};

export default LogoutButton;
