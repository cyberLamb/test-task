import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const useTokenRefresh = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          try {
            const response = await fetch('http://localhost:5000/api/auth/refresh', {
              method: 'POST',
              credentials: 'include',
            });

            const result = await response.json();
            if (response.ok) {
              localStorage.setItem('accessToken', result.accessToken);
            } else {
              console.error('Failed to refresh token:', result.message);
            }
          } catch (error) {
            console.error('Error refreshing token:', error);
          }
        }
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);
};

export default useTokenRefresh;
