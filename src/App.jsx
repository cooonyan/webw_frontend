import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Edit from './pages/edit';
import Register from './pages/register';
import Template from './pages/template';
import Test from './pages/test';
import LoginForm from './pages/loginform';
import Service from './pages/service';
// import './style/global.css'

// app.js는 라우팅 설정만 건듭니다 앵간해서 건들지 마시고 ./pages/ 폴더에 있는 파일들을 수정하세요 화이팅

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/register" element={<Register />} />
        <Route path="/template" element={<Template />} />
        <Route path="/test" element={<Test />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/*" element={<Service />} />
      </Routes>
    </Router>
  );
}

export default App;
