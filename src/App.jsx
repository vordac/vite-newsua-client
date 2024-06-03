import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './services/Firebase';
import axios from 'axios';

// Import your components
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
import New from './components/new/jsx/New';
import Profile from './components/profile/jsx/Profile';
import MyNews from './components/mynews/jsx/MyNews';
import Admin from './components/admin/jsx/Admin';
import Moderator from './components/admin/jsx/Moderator';
import Blocked from './components/blocked/jsx/Blocked';

import './components/auth/css/auth.css';
import './App.css';
import DropdownSort from './components/index/jsx/DropdownSort';

function App() {
  const [user, setUser] = useState('');
  const [auth, setAuth] = useState(null);
  const [articleID, setArticleID] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedAuthor, setSelectedAuthor] = useState();
  const [sortingType, setSortingType] = useState('publishTime');
  const [sortingDirection, setSortingDirection] = useState('desc');
  const [userUID, setUserUID] = useState('');
  const [userRole, setUserRole] = useState('');
  const [myNewsTab, setMyNewsTab] = useState(1);
  const [userNickname, setUserNickname] = useState('');
  const [isUserBlocked, setIsUserBlocked] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const auth = getAuth(app);
    setAuth(auth);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserUID(user.uid);
        setUserEmail(user.email);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function getUserRole() {
      if (userUID) {
        try {
          const response = await axios.get('https://newsua-217e80321b33.herokuapp.com/get-user-role', {
            params: {
              id: userUID
            },
          });
          setUserRole(response.data.role);
        } catch (error) {
          console.error('Error fetching role:', error);
        }
      }
    }
    getUserRole();
  }, [userUID]);


  useEffect(() => {
    async function getUserNickname() {
      if (userUID) {
        try {
          const response = await axios.get('https://newsua-217e80321b33.herokuapp.com/get-user-nickname', {
            params: {
              id: userUID
            },
          });
          setUserNickname(response.data.username);
        } catch (error) {
          console.error('Error fetching nickname:', error);
        }
      }
    }
    getUserNickname();
  }, [userUID]);

  const checkIfUserIsBlocked = async (email) => {
    try {
      const response = await axios.get("https://newsua-217e80321b33.herokuapp.com/is-user-blocked", {
        params: {
          email: email,
        },
      });
      setIsUserBlocked(response.data.isBlocked);
      localStorage.setItem("isBlocked", response.data.isBlocked);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      checkIfUserIsBlocked(user.email);
    }
  }, [user]);

  const handleSignoutClick = () => {
    if (auth) {
      auth.signOut();
      navigate('/');
    }
  };

  const LayoutIndex = () => {
    return (
      <div className='index'>
        <div className='index-divider'></div>
        <div className='index-content'>
          <div className='index-header'>
            <Header user={user} userRole={userRole} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
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
      <div className='layout-login'>
        <SignInForm setUser={setUser} user={user} setIsUserBlocked={setIsUserBlocked} />
      </div>
    );
  };

  const LayoutRegister = () => {
    return (
      <div className='layout-register'>
        <SignUpForm />
      </div>
    );
  };

  const LayoutRead = () => {
    return (
      <>
        <Header user={user} userRole={userRole} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <Read setSelectedAuthor={setSelectedAuthor} setSelectedCategory={setSelectedCategory} />
      </>
    );
  };

  const LayoutAuthor = () => {
    return (
      <>
        <Header user={user} userRole={userRole} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <AuthorHeader selectedAuthor={selectedAuthor} />
        <DropdownSort sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <AuthorNews selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingDirection={setSortingDirection} />
      </>
    )
  }

  const LayoutCategory = () => {
    return (
      <>
        <Header user={user} userRole={userRole} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <CategoryHeader selectedCategory={selectedCategory} />
        <DropdownSort sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <CategoryNews selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingDirection={setSortingDirection} setArticleID={setArticleID} />
      </>
    )
  }

  const LayoutAll = () => {
    return (
      <>
        <Header user={user} userRole={userRole} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <DropdownSort sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <AllNews selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} setSortingType={setSortingType} sortingDirection={sortingDirection} setSortingDirection={setSortingDirection} selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} />
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

  const LayoutProfile = () => {
    return (
      <>
        <Profile />
      </>
    );
  };

  const LayoutMyNews = () => {
    return (
      <div className='my-news'>
        <Header user={user} userRole={userRole} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <MyNews myNewsTab={myNewsTab} userNickname={userNickname} setMyNewsTab={setMyNewsTab} />
      </div>
    )
  }

  const LayoutAdmin = () => {
    return (
      <div className='admin'>
        <Header user={user} userRole={userRole} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <Admin userRole={userRole} />
      </div>
    )
  }

  const LayoutModer = () => {
    return (
      <div className='moder'>
        <Header user={user} userRole={userRole} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <Moderator userRole={userRole} />
      </div>
    )
  }

  if (isUserBlocked) {
    return (
      <Blocked handleSignoutClick={handleSignoutClick}/>
    )
  } else {
    return (
      <>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LayoutIndex />}/>
              <Route path="/login" element={<LayoutLogin />}/>
              <Route path="/register" element={<LayoutRegister />}/>
              <Route path="/read" element={<LayoutRead />}/>
              <Route path="/author" element={<LayoutAuthor />}/>
              <Route path="/category" element={<LayoutCategory />}/>
              <Route path="/all" element={<LayoutAll />}/>
              <Route path="/new" element={<LayoutNew />}/>
              <Route path="/profile" element={<LayoutProfile />} />
              <Route path="/my-news" element={<LayoutMyNews />}/>
              <Route path="/admin" element={<LayoutAdmin />} />
              <Route path="/moder" element={<LayoutModer />} />
            </Routes>
          </div>
        </Router>
      </>
    );
  }


}

export default App;