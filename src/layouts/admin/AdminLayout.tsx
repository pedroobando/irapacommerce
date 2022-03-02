import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { iLayoutProps } from '../interface/interface';
import { AdminNavbar } from './AdminNavbar';
// import { AdminSidebar } from './AdminSidebar';

const AdminLayout = ({ children, className = '' }: iLayoutProps) => {
  const { user } = useContext(AuthContext);
  const displayName = user.decoded.displayName;

  return (
    <>
      <AdminNavbar displayName={displayName} imagenUrl={'/image/commerce.png'} />
      <div className={className}>{children}</div>
    </>
  );
};

export default AdminLayout;
