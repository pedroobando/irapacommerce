// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { iLayoutProps } from '../interface/interface';
// import { AdminNavbar } from './AdminNavbar';
// // import { AdminSidebar } from './AdminSidebar';

// const AdminLayout = ({ children, className = '' }: iLayoutProps) => {
//   const { user } = useContext(AuthContext);
//   const displayName = user.decoded.displayName;

//   return (
//     <>
//       <AdminNavbar displayName={displayName} imagenUrl={'/image/commerce.png'} />
//       <div className={className}>{children}</div>
//     </>
//   );
// };

// export default AdminLayout;

import React from 'react';
import { FaDev } from 'react-icons/fa';

import styles from './AdminLayout.module.css';
import useNavigation from '../../hooks/useNavigation';
import navigationData from '../../data/navegation';

import Navbar from '../components/Navbar';
import Tabbar from '../components/Tabbar';

const AdminLayout = () => {
  const { currentRoute, setCurrentRoute } = useNavigation();

  return (
    <div className={styles.container}>
      <Navbar
        navigationData={navigationData}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <Tabbar
        navigationData={navigationData}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <div className={styles.devLogo}>
        <FaDev />
      </div>
    </div>
  );
};

export default AdminLayout;
