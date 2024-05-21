import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './services/Firebase';

import Header from './components/index/jsx/Header';
import NewsGrid from './components/index/jsx/NewsGrid';
import SignInForm from './components/auth/jsx/SignInForm';
import SignUpForm from './components/auth/jsx/SignUpForm';
import Read from './components/read/jsx/Read';

import LastNews from './components/index/jsx/news/LastNews';
import MainNews from './components/index/jsx/news/MainNews';
import PopularNews from './components/index/jsx/news/PopularNews';
import UkrainianNews from './components/index/jsx/news/UkrainianNews';
import WorldNews from './components/index/jsx/news/WorldNews';
import BusinessNews from './components/index/jsx/news/BusinessNews';
import TechnologyNews from './components/index/jsx/news/TechnologyNews';
import CultureNews from './components/index/jsx/news/CultureNews';
import HealthNews from './components/index/jsx/news/HealthNews';
import SportNews from './components/index/jsx/news/SportNews';
import GamesNews from './components/index/jsx/news/GamesNews';

function App() {

  const [user, setUser] = useState('');
  const [auth, setAuth] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState();
  const [sortingType, setSortingType] = useState('publishTime');
  const [sortingDirection, setSortingDirection] = useState('desc');

  useEffect(() => {
    const auth = getAuth(app); // get auth instance
    setAuth(auth);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const LayoutIndex = () => {
    return (
      <div className='index'>
        <div className='index-divider'></div>
        <div className='index-content'>
          <div className='index-header'>
            <Header user={user} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
          </div>
          <div className='index-news'>
            <div className='index-news-last'>
              <h4>ОСТАННІ НОВИНИ</h4>
              <LastNews />
            </div>
            <div className='index-news-other'>
              <h4>ГОЛОВНЕ</h4>
              <MainNews />
              <h4>ПОПУЛЯРНЕ</h4>
              <PopularNews />
              <h4>ПРО УКРАЇНУ</h4>
              <UkrainianNews />
              <h4>ПРО СВІТ</h4>
              <WorldNews />
              <h4>ПРО БІЗНЕС</h4>
              <BusinessNews />
              <h4>ПРО ТЕХНОЛОГІЇ</h4>
              <TechnologyNews />
              <h4>ПРО КУЛЬТУРУ</h4>
              <CultureNews />
              <h4>ПРО ЗДОРОВ'Я</h4>
              <HealthNews />
              <h4>ПРО СПОРТ</h4>
              <SportNews />
              <h4>ПРО ІГРИ</h4>
              <GamesNews />
              
              {/* <NewsGrid selectedCategory={selectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingDirection={setSortingDirection} /> */}
            </div>
          </div>
        </div>
        <div className='index-divider'></div>
      </div>
    );
  };

  const LayoutLogin = () => {
    return (
      <>
        <SignInForm setUser={setUser} />
      </>
    );
  };

  const LayoutRegister = () => {
    return (
      <>
        <SignUpForm />
      </>
    );
  };

  const LayoutRead = () => {
    return (
      <>
        <Header user={user} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <Read />
      </>
    );
  };

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LayoutIndex />}></Route>
            {/* <Route path="/auth" element={<LayoutAuth />}></Route> */}
            <Route path="/login" element={<LayoutLogin />}></Route>
            <Route path="/register" element={<LayoutRegister />}></Route>
            <Route path="/read" element={<LayoutRead />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
