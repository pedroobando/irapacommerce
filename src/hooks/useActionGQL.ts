import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchgql } from '../graphql/fetchgql';

const initialState = { data: null, errors: undefined, loading: true };
export const useActionGQL = (instruction: any, variables = {}) => {
  const [localData, setLocalData] = useState(initialState);
  const {
    user: { token },
  } = useContext(AuthContext);

  useEffect(() => {
    localData.loading &&
      fetchgql(instruction, variables, token).then(({ data, errors }) => {
        // console.log(errors)
        setLocalData({ loading: false, errors, data });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...localData,
  };
};
