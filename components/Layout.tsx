import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Head>
        <title>nisbaj.xyz</title>
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
