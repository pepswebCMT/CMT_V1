import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import './App.css';
import LoginPage from './pages/LoginPage';
import CelebrityDetailPage from './pages/CelebDetailsPage';
import PhotoPage from './pages/PhotoPage';
import 'leaflet/dist/leaflet.css';
import MyMap from './pages/MapPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/category/:categoryName/:celebrityId" element={<CelebrityDetailPage />} />
        <Route path="/photopage" element={<PhotoPage />} />
        <Route path="/map" element={<MyMap />} />
      </Routes>
    </Router>
  );
};

export default App;
