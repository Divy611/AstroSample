import './App.css';
import { useEffect } from 'react';
import Home from './Components/home';
import About from './Components/about';
import Header from './Components/header';
import Footer from './Components/footer';
import Contact from './Components/contact';
import NotFound from './Components/notFound';
import Services from './Components/services';
import Readings from './Components/readings';
import PrivacyPolicy from './Components/privacy';
import TermsAndConditions from './Components/terms';
import { Switch, Route, useLocation, BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom';

function App() { return <Router><AppContent /></Router> }

function AppContent() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/contact" render={() => <Contact />} />
        <Route exact path="/services" render={() => <Services />} />
        <Route exact path="/readings" render={() => <Readings />} />
        <Route exact path="/privacy" render={() => <PrivacyPolicy />} />
        <Route exact path="/terms" render={() => <TermsAndConditions />} />
        <Route render={() => <NotFound />} />
      </Switch>
      <Footer />
    </div>
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

export default App;