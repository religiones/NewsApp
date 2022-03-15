import { BrowserRouter, Route, Routes } from 'react-router-dom';
import News from './components/News';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';
import NewsPublish from './components/NewsPublish';
import './App.css';

function App() {
  return (
    <div className="App" style={{width:"100vw", height:"100vh",background:"#f0f2f5"}}>
      <BrowserRouter >
        <Routes>  
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/' element={<News/>}></Route>
          <Route path='/user' element={<User/>}></Route>
          <Route path='/newsPublish' element={<NewsPublish/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
