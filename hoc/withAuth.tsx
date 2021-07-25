import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { decode } from '../lib/token';

function verifyToken(token: string) {
  if (!token) return false;

  try {
    decode(token);

    return true;
  } catch (e) {
    return false;
  }
}

export function useAuth() {
  const router = useRouter();

  const [auth, setAuth] = useState({
    loading: true,
    loaded: false,
    tokenVerified: false,
  });

  useEffect(() => {
    const token = window.localStorage.getItem('token') || '';

    const tokenVerified = verifyToken(token);

    if (router.pathname === '/management/login' && tokenVerified) {
      router.push('/management');
    }

    if (!tokenVerified) {
      router.push('/management/login');
    }

    setAuth({
      loading: false,
      loaded: true,
      tokenVerified,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return auth;
}

export function withAuth(Component: any) {
  return function AuthIntermediate(props: any) {
    const auth = useAuth();

    const router = useRouter();

    if (
      !auth.loaded ||
      (router.pathname === '/management/login' && auth.tokenVerified) ||
      (router.pathname !== '/management/login' && !auth.tokenVerified)
    ) {
      return <p>Loading</p>;
    }

    return <Component {...props} />;
  };
}
