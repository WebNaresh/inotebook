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

function App() {
  return (
    < >
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
