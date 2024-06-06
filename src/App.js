import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import CelebrityDetailPage from "./pages/CelebDetailsPage";
import PhotoPage from "./pages/PhotoPage";
import "leaflet/dist/leaflet.css";
import MyMap from "./pages/MapPage";
import AdminPage from "./pages/AdminPage";
import CoverPage from "./pages/CoverPage";
import NotFound from "./pages/default/NotFound";
import Unavailable from "./pages/default/Unavailalble";

import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<CoverPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/unavailable" element={<Unavailable />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/category/:categoryName/:celebrityId"
            element={<CelebrityDetailPage />}
          />
          <Route path="/photopage" element={<PhotoPage />} />
          <Route path="/map" element={<MyMap />} />
          <Route path="/map/:place" element={<MyMap />} />
          <Route
            path="/admin"
            element={<PrivateRoute element={<AdminPage />} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
