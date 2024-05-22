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
import ShowAllNews from './components/index/jsx/ShowAllNews';

import CategoryNews from './components/index/jsx/news/CategoryNews';
import AuthorNews from './components/index/jsx/news/AuthorNews';

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
              <ShowAllNews />
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

  const LayoutAuthor = () => {
    return (
      <>
        <AuthorNews selectedCategory={selectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingDirection={setSortingDirection}/>
      </>
    )
  }

  const LayoutCategory = () => {
    return(
      <>
        <CategoryNews selectedCategory={selectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingDirection={setSortingDirection}/> 
      </>
    )
  }

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LayoutIndex />}></Route>
            <Route path="/login" element={<LayoutLogin />}></Route>
            <Route path="/register" element={<LayoutRegister />}></Route>
            <Route path="/read" element={<LayoutRead />}></Route>
            <Route path="/author" element={<LayoutAuthor />}></Route>
            <Route path="/category" element={<LayoutCategory />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
{/* <NewsGrid selectedCategory={selectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingDirection={setSortingDirection} /> */}