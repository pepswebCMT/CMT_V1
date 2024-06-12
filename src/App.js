import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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

import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  React.useEffect(() => {
    var _mtm = (window._mtm = window._mtm || []);
    _mtm.push({ "mtm.startTime": new Date().getTime(), event: "mtm.Start" });
    var d = document,
      g = d.createElement("script"),
      s = d.getElementsByTagName("script")[0];
    g.async = true;
    g.src =
      "https://cdn.matomo.cloud/catchmytomb.matomo.cloud/container_yWAxcPog.js";
    s.parentNode.insertBefore(g, s);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<CoverPage />} />
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
