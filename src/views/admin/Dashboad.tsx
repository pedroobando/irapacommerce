import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Dashboad = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div>user:{user.decoded.displayName}</div>
      Dashboad
    </div>
  );
};
