import styles from './AdminLayout.module.css';
import navigationData from '../../data/navegation';

import Navbar from '../components/Navbar';
import Tabbar from '../components/Tabbar';
import { iLayoutProps } from '../interface/interface';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminLayout = ({ children, className }: iLayoutProps) => {
  const { doLogout, user } = useContext(AuthContext);
  return (
    <div className={styles.appcontainer}>
      <Navbar
        navigationData={navigationData}
        displayName={user.decoded.displayName}
        closeApp={doLogout}
      />
      <Tabbar navigationData={navigationData} />
      <div className={className}>{children}</div>
    </div>
  );
};

export default AdminLayout;
