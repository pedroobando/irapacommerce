import React, { useCallback } from 'react';
import classNames from 'classnames';
import { AiFillHome, AiFillCompass } from 'react-icons/ai';
import { BsFillBagFill, BsFillPersonFill } from 'react-icons/bs';
import { CgInbox } from 'react-icons/cg';

import styles from './Tabbar.module.css';
import { NavLink } from 'react-router-dom';

interface iNavDataProps {
  name: string;
  to: string;
}

interface iTabbarProps {
  navigationData: iNavDataProps[];
}

const Tabbar = ({ navigationData }: iTabbarProps) => {
  const getTabIcon = useCallback((item) => {
    switch (item) {
      case 'Home':
        return <AiFillHome />;
      case 'Producto':
        return <AiFillCompass />;
      case 'Store':
        return <BsFillBagFill />;
      case 'Inbox':
        return <CgInbox />;
      case 'Profile':
        return <BsFillPersonFill />;
    }
  }, []);

  return (
    <nav className={styles.tabbar}>
      {navigationData.map((item: iNavDataProps, index: any) => (
        <NavLink
          to={item.to}
          key={index}
          className={({ isActive }) =>
            isActive ? `${styles.tabItemActive} ${styles.tabItem}` : styles.tabItem
          }>
          <span className={styles.icon}>{getTabIcon(item.name)}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Tabbar;
