import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Head from './components/Head';
import HeadWithTitle from './components/HeadWithTitle';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routers/Router';
import Notice from './pages/Notice';
import Search from './pages/Search';
import NoticeForm from './pages/NoticeForm';

import './styles/App.css';
import './styles/Login.css';
import './styles/Register.css';
import './styles/Main.css';
import './styles/Search.css';
import './styles/NoticeForm.css';

const App = () => {
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/';
  const isMainPage = location.pathname === '/main';
  const isNoticePage = location.pathname === '/notices';
  const isSearchPage = location.pathname === '/search';
  const isNotficeFormPage = location.pathname === '/notices-insert' || location.pathname === '/notices/:id';

  const handleToggleFooter = (isOpen) => {
    setIsFooterOpen(isOpen);
  };

  if (isAuthPage) {
    return (
      <div id="root" className={isFooterOpen ? 'footer-open' : ''}>
        <div className="container">
          <AppRoutes />
        </div>
      </div>
    );
  }

  if (isNoticePage) {
    return (
      <div id="root" className={isFooterOpen ? 'footer-open' : ''}>
        <HeadWithTitle title="Notice" />
        <Notice />
        <Footer onToggle={handleToggleFooter} />
      </div>
    );
  }

  if (isSearchPage) {
    return (
      <div id="root" className={isFooterOpen ? 'footer-open' : ''}>
        <Search />
        <Footer onToggle={handleToggleFooter} />
      </div>
    );
  }

  if (isNotficeFormPage) {
    return (
      <div id="root">
        <NoticeForm />
      </div>
    );
  }

  return (
    <div id="root" className={isFooterOpen ? 'footer-open' : ''}>
      {isMainPage ? <Head /> : <HeadWithTitle title="Lounge" />}
      {isMainPage && <Header />}
      <div className="container">
        <AppRoutes />
      </div>
      <Footer onToggle={handleToggleFooter} />
    </div>
  );
};

export default App;
