import '../styles/globals.scss';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app';

type Props = AppProps & {
  Component: AppProps['Component'] & { getLayout?: Function };
};

function MyApp({ Component, pageProps }: Props) {
  if (Component.getLayout?.().noDecoration) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
