import styles from './AdminLayout.module.css';
import navigationData from '../../data/navegation';

import Navbar from '../components/Navbar';
import Tabbar from '../components/Tabbar';
import { iLayoutProps } from '../interface/interface';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminLayout = ({ children }: iLayoutProps) => {
  const { doLogout, user } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <Navbar
        navigationData={navigationData}
        displayName={user.decoded.displayName}
        closeApp={doLogout}
      />
      <Tabbar navigationData={navigationData} />
      <div className={styles.devLogo}>{children}</div>
    </div>
  );
};

export default AdminLayout;
