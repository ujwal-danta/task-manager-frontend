
import './App.css';
import Edit from './pages/Edit';
// import Card from './components/Card';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
