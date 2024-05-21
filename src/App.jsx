import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './services/Firebase';

import Header from './components/index/jsx/Header';
import NewsGrid from './components/index/jsx/NewsGrid';
import SignInForm from './components/auth/jsx/SignInForm';
import SignUpForm from './components/auth/jsx/SignUpForm';
import Read from './components/read/jsx/Read';

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
      <>
        <Header user={user} auth={auth} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <NewsGrid selectedCategory={selectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingDirection={setSortingDirection} />
      </>
    );
  };

  const LayoutLogin = () => {
    return (
      <>
        <SignInForm setUser={setUser}/>
      </>
    );
  };

  const LayoutRegister = () => {
    return (
      <>
        <SignUpForm/>
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
