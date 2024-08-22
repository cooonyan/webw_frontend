import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from '../style/home.module.css';
import logo from '../img/logo.jpg';
import home from '../img/home.png';

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
      <div className={styles.all_page}>
        <div className={styles.background}>
          <div className={styles.clarity}></div>
          <header className={styles.header_common}>
            <h1 className={styles.logo}>
              <a className={styles.link_logo} href="/" style={{textDecoration: 'none'}}>
                <img src={logo} width="55" height="55" style={{verticalAlign: 'top'}} alt="Logo"/>
              </a>
              <a className={styles.link_blog} href="/" style={{textDecoration: 'none'}}>
                <span style={{fontSize: '30px', verticalAlign: 'top'}}>story</span>
              </a>
            </h1>
            <div className={styles.header_title}>
              <h2>USER'S STORY</h2>
            </div>
            <nav className={styles.menu}>
              <ul className={styles.btn}>
                {isLoggedIn ? (
                    <>
                    <li>
                      <button type={'button'} className={styles.login} onClick={() => navigate('/edit')}>페이지 편집</button>
                    </li>
                    <li>
                      <button type={'button'} className={styles.signup} onClick={handleLogout}>로그아웃</button>
                    </li>
                    </>
                ) : (
                    <>
                    <li>
                      <button type="button" className={styles.login} onClick={() => navigate('/loginform')}>로그인</button>
                    </li>
                    <li>
                      <button type="button" className={styles.signup} onClick={() => navigate('/register')}>회원가입</button>
                    </li>
                    </>
                )}
              </ul>
            </nav>
          </header>
        <section className={styles.photo_section}>
                  <img src={home} alt="Centered Photo" className={styles.centered_photo}/>
                </section>
              </div>
            </div>
        );
      }

export default Home;
