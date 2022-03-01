import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import './styles.css';

export const AdminSidebar = () => {
  const { doLogout } = useContext(AuthContext);

  const handlelogout = async () => {
    // await signLogOut();
    doLogout();
  };

  return (
    <div className="fixed top-0 left-0 h-full w-32 bg-[#9395D3] py-5 px-8 transition-none duration-75">
      <Link to="/" className="mt-6 mb-16 items-center">
        <img
          className="blur-[2px]"
          src={'/images/servident-mj.svg'}
          loading="eager"
          alt=""
          // width={'70px'}
        />
        {/* <span className="ml-4 hidden items-center text-[#251101] lg:flex lg:flex-col">
          <h4 className="inline-block font-alata text-4xl">ServiDent MJ</h4>
          <h6 className="inline-block font-alata text-xl">CENTRO ODONTOLOGICO</h6>
        </span> */}
      </Link>

      <nav className="relative list-none">
        <li className="my-6 px-4 text-[#251101] no-underline ease-in">
          <button
            onClick={handlelogout}
            className="flex w-full items-center py-6 hover:rounded-md hover:text-yellow-500">
            <p className="text-2xl font-bold"></p>
          </button>
        </li>
      </nav>
    </div>
  );
};
