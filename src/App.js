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
import AdminPage from './pages/AdminPage';
import CoverPage from './pages/CoverPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/cover' element={<CoverPage/>}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route
          path="/category/:categoryName/:celebrityId"
          element={<CelebrityDetailPage />}
        />
        <Route path="/photopage" element={<PhotoPage />} />
        <Route path="/map" element={<MyMap />} />
        <Route path="/admin" element={< AdminPage/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
