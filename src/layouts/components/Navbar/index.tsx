import { GiShoppingCart } from 'react-icons/gi';
import { FaPowerOff } from 'react-icons/fa';

import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

interface iNavDataProps {
  name: string;
  to: string;
}

interface iNavbarProps {
  navigationData: iNavDataProps[];
  displayName: string;
  closeApp: () => void;
}

const Navbar = ({ navigationData, displayName, closeApp }: iNavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <span className={styles.logo}>
        <GiShoppingCart />
      </span>
      <ul className={styles.navItems}>
        {navigationData.map((item: iNavDataProps, index: any) => (
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              isActive ? `${styles.selectedNavItem} ${styles.navItem}` : styles.navItem
            }
            key={index}>
            {item.name}
          </NavLink>
        ))}
      </ul>
      <div className="flex align-middle">
        <span className="text-gray-400 text-base font-semibold">{displayName}</span>
        <FaPowerOff className="ml-2 text-red-900 inline text-2xl" onClick={closeApp} />
      </div>
    </nav>
  );
};

export default Navbar;
