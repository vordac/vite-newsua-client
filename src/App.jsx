import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './services/Firebase';

import Header from './components/index/jsx/Header';
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
import CategoryHeader from './components/index/jsx/CategoryHeader';
import AuthorNews from './components/index/jsx/news/AuthorNews';
import AuthorHeader from './components/index/jsx/AuthorHeader';
import AllNews from './components/index/jsx/news/AllNews';

import './components/auth/css/auth.css';
import './App.css';
import New from './components/new/jsx/New';

function App() {

  const [user, setUser] = useState('');
  const [auth, setAuth] = useState(null);
  const [articleID, setArticleID] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedAuthor, setSelectedAuthor] = useState();
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
              <ShowAllNews setSelectedCategory={setSelectedCategory} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
            </div>
            <div className='index-news-other'>
              <h4>ГОЛОВНЕ</h4>
              <MainNews setSelectedCategory={setSelectedCategory} setSelectedAuthor={setSelectedAuthor} setArticleID={setArticleID} />
              <h4>ПОПУЛЯРНЕ</h4>
              <PopularNews setSelectedCategory={setSelectedCategory} setSelectedAuthor={setSelectedAuthor} setArticleID={setArticleID} />
              <h4>ПРО УКРАЇНУ</h4>
              <UkrainianNews setSelectedCategory={setSelectedCategory} setSelectedAuthor={setSelectedAuthor} setArticleID={setArticleID} />
              <h4>ПРО СВІТ</h4>
              <WorldNews setSelectedCategory={setSelectedCategory} setSelectedAuthor={setSelectedAuthor} setArticleID={setArticleID} />
            </div>
          </div>
        </div>
        <div className='index-divider'></div>
      </div>
    );
  };

  const LayoutLogin = () => {
    return (
      <SignInForm setUser={setUser} />
    );
  };

  const LayoutRegister = () => {
    return (
      <div className='auth'>
        <SignUpForm />
      </div>
    );
  };

  const LayoutRead = () => {
    return (
      <>
        <Header user={user} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <Read setSelectedAuthor={setSelectedAuthor} setSelectedCategory={setSelectedCategory} />
      </>
    );
  };

  const LayoutAuthor = () => {
    return (
      <>
        <Header user={user} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <AuthorHeader selectedAuthor={selectedAuthor} />
        <AuthorNews selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingDirection={setSortingDirection} setArticleID={setArticleID} />
      </>
    )
  }

  const LayoutCategory = () => {
    return (
      <>
        <Header user={user} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <CategoryHeader selectedCategory={selectedCategory} />
        <CategoryNews selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingDirection={setSortingDirection} setArticleID={setArticleID} />
      </>
    )
  }

  const LayoutAll = () => {
    return (
      <>
        <Header user={user} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <AllNews selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} setSortingType={setSortingType} sortingDirection={setSortingDirection} setSortingDirection={setSortingDirection} selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} />
      </>
    )
  }

  const LayoutNew = () => {
    return (
      <div className='new'>
        <New />
      </div>
    );
  };

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
            <Route path="/all" element={<LayoutAll />}></Route>
            <Route path="/new" element={<LayoutNew />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;