// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { About, Home, NotFound } from '../pages';
import { Games } from '../pages/admin';

const AdminRouter = ({ children }: { children: React.ReactNode }) => {

  const isAdmin = JSON.parse(sessionStorage.getItem('authData')!).user.isAdmin;

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const Routers: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/admin/games" element={<AdminRouter><Games /></AdminRouter>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
};

export default Routers;
