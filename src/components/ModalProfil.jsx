import React from 'react';
import { signOut } from 'firebase/auth';
import { deleteUser } from 'firebase/auth';
import { Auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(Auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.');
    if (confirmation) {
      try {
        await deleteUser(Auth.currentUser);
        navigate('/');
      } catch (error) {
        console.error('Error deleting user: ', error);
      }
    }
  };

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button className="logout-button" onClick={handleSignOut}>
      <FiLogOut className="icon" />
      <span>Déconnexion</span>
      </button>
      <button onClick={handleDeleteAccount}>Supprimer le compte</button>
    </div>
  );
};

export default UserProfile;
