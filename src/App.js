import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Home } from './component/Home';
import NoteState from './context/notes/NoteState';
import { Navbar } from './component/Navbar';
import { About } from './component/About';
import Alert from './component/Alert';
import { Login } from './component/Login';
import { Signup } from './component/Signup';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type
    })
    setTimeout(() => {
      setAlert(null)
    }, 500);
  }

  return (
    < >
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert ={alert}/>
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />}/>
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
