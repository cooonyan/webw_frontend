import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../style/loginform.module.css"

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, private_token: password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('내부 에러');
    }
  };


  return (
      <div className={styles.all_page}>
      <form onSubmit={handleSubmit} className={styles.login_container}>
        <h1>로그인</h1>
        <div className={styles.input_group}>
          <label htmlFor="email">아이디</label>
          <input
              type="text"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="password">비밀번호</label>
          <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.button_group}>로그인</button>
        <div className={styles.extra_links}>
          <a href="/register" onClick={() => navigate('/register')}>회원가입</a>
        </div>
      </form>
      </div>
  );
}

export default LoginForm;
