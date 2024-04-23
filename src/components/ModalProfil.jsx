import React from "react";
import { signOut } from "firebase/auth";
import { Auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    navigate("/login");
  };

  return (
    <div className="user-profile">
      {/* <h2>{user.name}</h2>
      <p>{user.email}</p> */}
      <button className="logout-button" onClick={handleSignIn}>
        <FiLogOut className="icon" />
        <span>Connexion</span>
      </button>
    </div>
  );
};

export default UserProfile;
