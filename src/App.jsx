import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Edit from './pages/edit';
import Register from './pages/register';
import LoginForm from './pages/loginform';
import Service from './pages/service';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/*" element={<Service />} />
      </Routes>
    </Router>
  );
}

export default App;
