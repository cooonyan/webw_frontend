import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>로그인 상태</h1>
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={() => navigate('/edit')}>편집 페이지로 이동</button>
        </div>
      ) : (
        <div>
          <h1>Guest 상태</h1>
          <button onClick={() => navigate('/register')}>회원가입</button>
          <button onClick={() => navigate('/loginform')}>로그인 하기</button>
        </div>
      )}
    </div>
  );
}

export default Home;
