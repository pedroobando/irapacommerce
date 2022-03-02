import React, { useCallback } from 'react';
import classNames from 'classnames';
import { AiFillHome, AiFillCompass } from 'react-icons/ai';
import { BsFillBagFill, BsFillPersonFill } from 'react-icons/bs';
import { CgInbox } from 'react-icons/cg';

import styles from './Tabbar.module.css';
interface iTabbarProps {
  navigationData: any;
  currentRoute: any;
  setCurrentRoute: any;
}

const Tabbar = ({ navigationData, currentRoute, setCurrentRoute }: iTabbarProps) => {
  const getTabIcon = useCallback((item) => {
    switch (item) {
      case 'Home':
        return <AiFillHome />;
      case 'Discover':
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
      {navigationData.map((item: any, index: any) => (
        <span
          key={index}
          className={classNames([styles.tabItem, currentRoute === item && styles.tabItemActive])}
          onClick={() => setCurrentRoute(item)}>
          <span className={styles.icon}>{getTabIcon(item)}</span>
        </span>
      ))}
    </nav>
  );
};

export default Tabbar;
