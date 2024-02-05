import {useEffect, useState} from 'react';
import {useAppSelector} from './store';

const useAuth = () => {
  const {refreshToken} = useAppSelector(state => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(!!refreshToken);
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    setIsAuthenticated(!!refreshToken);
    setRoute(window.location.pathname);
  }, [refreshToken]);

  return {isAuthenticated, route};
};

export default useAuth;
