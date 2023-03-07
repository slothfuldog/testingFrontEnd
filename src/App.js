import logo from './logo.svg';
import './App.css';
import LoginPage from './page/LoginUser';
import {Routes, Route} from "react-router-dom"; 
import SignupPage from './page/SignupUser';
import HomePage from './page/Home';
import NotFoundPage from './page/NotFound';
import SignupPanelPage from './page/SignupPanel';
import LoginPanelPage from './page/LoginPanel';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/signup' element={<SignupPanelPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/*' element={<NotFoundPage />}/>
      </Routes>
    </div>
  );
}

export default App;
