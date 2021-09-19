import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Head>
        <title>nisbaj.xyz</title>
        <meta name="description" content="Nisbaj's personal space" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className="flex flex-col min-h-screen h-screen justify-between">
        <Header />
        <div className="container lg:width-1024 mx-auto mb-auto p-4">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
