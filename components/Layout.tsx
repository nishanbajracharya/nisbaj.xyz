import Header from './Header';
import Footer from './Footer';

const Layout: React.FunctionComponent = ({children}) => {
  return (
    <>
      <Header />
      <div className="app-content">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
