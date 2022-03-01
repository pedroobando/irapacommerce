import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { iLayoutProps } from '../interface/interface';
import { AdminNavbar } from './AdminNavbar';
import { AdminSidebar } from './AdminSidebar';

const AdminLayout = ({ children }: iLayoutProps) => {
  const { user } = useContext(AuthContext);
  const displayName = user.decoded.name;

  return (
    <>
      <div className="m-0 box-border h-screen w-full bg-[#FBF9FF] p-0 transition-none duration-75">
        <AdminSidebar />
        <div className="top-0 pl-32">
          <AdminNavbar displayName={displayName} imagenUrl={'/images/user-none.jpg'} />
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
