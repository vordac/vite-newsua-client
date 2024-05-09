import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { SignUpForm } from './components/index/jsx/SignUpForm';
import { SignInForm } from './components/index/jsx/SignInForm';
import NewsGrid from './components/index/jsx/NewsGrid';

function App() {

  const LayoutIndex = () => {
    return (
      <>
        {/* <Header /> */}
        <NewsGrid />
      </>
    );
  };

  const LayoutAuth = () => {
    return (
      <>
        {/* <Header /> */}
        <SignUpForm />
        <SignInForm />
      </>
    );
  };

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LayoutIndex />}></Route>
            <Route path="/auth" element={<LayoutAuth />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
