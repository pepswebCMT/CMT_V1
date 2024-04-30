import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserProfile = ({ user }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      if (error) setError("");
    }, 5000);

    const confirmationTimeout = setTimeout(() => {
      if (confirmationMessage) setConfirmationMessage("");
    }, 5000);

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(confirmationTimeout);
    };
  }, [error, confirmationMessage]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setRememberMe(checked);
    } else {
      setCredentials({
        ...credentials,
        [name]: value,
      });
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        Auth,
        credentials.email,
        credentials.password
      );
      navigate("/admin");
    } catch (error) {
      setError(t("profile_modal_error"));
    }
  };

  return (
    <div className="w-full text-gray-600 bg-white p-6 rounded-xl flex flex-col justify-evenly items-center">
      <p className="w-full text-2xl font-bold text-center">
        {t("profile_modal_title")}
      </p>
      <input
        className="w-full m-2 p-2 text-xl text-black border-2 border-slate-500 rounded-md"
        name="email"
        type="email"
        value={credentials.email}
        onChange={handleInputChange}
        placeholder={t("profile_modal_mail")}
        required
      />
      <input
        className="w-full m-2 p-2 text-xl text-black border-2 border-slate-500 rounded-md"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleInputChange}
        placeholder={t("profile_modal_pass")}
        required
      />
      {error && <p className="error-message">{error}</p>}
      <div className="w-full text-lg font-bold p-2 flex items-center">
        <input
          className="m-2 w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          name="rememberMe"
          type="checkbox"
          checked={rememberMe}
          onChange={handleInputChange}
        />
        <label className="" htmlFor="rememberMe">
          {t("profile_modal_remeber")}
        </label>
      </div>
      <div className="w-full p-2 flex justify-center items-center">
        <button
          className="w-3/4 p-4 bg-blue-500 text-xl text-white rounded-xl"
          onClick={handleLogin}
        >
          {t("profile_modal_login")}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
