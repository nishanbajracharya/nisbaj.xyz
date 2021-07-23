import '../styles/globals.css';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app';

type Props = AppProps & {
  Component: AppProps["Component"] & {getLayout: Function}
}

function MyApp({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || (() => ({}));

  if (getLayout().noDecoration) {
    return <Component {...pageProps} />;
  }

  return <Layout>
    <Component {...pageProps} />
  </Layout>;
}
export default MyApp;
