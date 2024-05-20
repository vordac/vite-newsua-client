import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthBox from './components/auth/jsx/AuthBox';
import Header from './components/index/jsx/Header';
import NewsGrid from './components/index/jsx/NewsGrid';
import Cookies from 'js-cookie';  
import SignInForm from './components/auth/jsx/SignInForm';
import SignUpForm from './components/auth/jsx/SignUpForm';

function App() {

  const [user, setUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();
  const [sortingType, setSortingType] = useState('publishTime');
  const [sortingDirection, setSortingDirection] = useState('desc');
  const [isSignin, setIsSignin] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      console.log("USER EXISTS");
    }
  }, []);

  const LayoutIndex = () => {
    return (
      <>
        <Header user={user} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
        <NewsGrid selectedCategory={selectedCategory} sortingType={sortingType} sortingDirection={sortingDirection} setSortingDirection={setSortingDirection} />
      </>
    );
  };

  // const LayoutAuth = () => {
  //   return (
  //     <>
  //       <AuthBox setUser={setUser} />
  //     </>
  //   );
  // };

  const LayoutLogin = () => {
    return (
      <>
        <SignInForm onSigninSuccess={(user) => setUser(user)} setUser={setUser}/>
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

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LayoutIndex />}></Route>
            {/* <Route path="/auth" element={<LayoutAuth />}></Route> */}
            <Route path="/login" element={<LayoutLogin />}></Route>
            <Route path="/register" element={<LayoutRegister />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
