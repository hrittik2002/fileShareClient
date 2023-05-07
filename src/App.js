import './App.css';
import DownloadPage from './pages/DownloadPage/DownloadPage';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter , Routes , Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route exact path='/' element={<HomePage/>} />
        <Route path='/files/:uuid' element={<DownloadPage/>} />
      </Routes>
    </BrowserRouter>
    // <HomePage/>
    // <DownloadPage/>
  );
}

export default App;
