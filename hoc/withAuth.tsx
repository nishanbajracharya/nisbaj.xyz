import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import { decode } from '../lib/token';

(global as any)['decode'] = decode;

function verifyToken(token: string) {
  if (!token) return false;

  try {
    const result = decode(token);

    if (!result) return false;

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

type IntermediateComponent = AppProps['Component'] & { getLayout?: Function };

export function withAuth(
  Component: AppProps['Component']
): IntermediateComponent {
  function AuthIntermediate(props: any) {
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
  }

  return AuthIntermediate;
}
