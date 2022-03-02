import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AdminLayout from '../../layouts/admin/AdminLayout';

export const Dashboad = () => {
  const { doLogout } = useContext(AuthContext);

  return (
    <AdminLayout className="container">
      <h1>Dashboad</h1>
      <div className="row">
        <div className="col-4">
          <button onClick={doLogout} className="btn btn-success btn-sm ml-3">
            logout
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};
