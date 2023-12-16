import { useMemo } from 'react';
import {useIsLoading, useSelectCurrentUser} from '../../redux/auth';
import { useAppSelector } from '../../redux/hook';

export const useAuth = () => {
  const user = useAppSelector(useSelectCurrentUser);

  console.log(user,'11')
  return useMemo(
    () => ({user: user ? {...user} : null}),
    [user],
  );
};
