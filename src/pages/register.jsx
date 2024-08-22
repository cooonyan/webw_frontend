import React, {useState} from 'react';
import axios from 'axios';
import styles from "../style/loginform.module.css";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [privateToken, setPrivateToken] = useState('');
    const [verifyPrivateToken, setverifyToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim() || !privateToken.trim()) {
            alert('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }
        if (privateToken !== verifyPrivateToken) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', {
                username,
                private_token: privateToken,
            });


            if (response.status === 200) {
                const {status, message} = response.data;
                if (status === 'success') {
                    alert('회원가입이 완료되었습니다.');
                    navigate('/loginform');
                } else {
                    alert(message);
                }
            } else {
                alert('알 수 없는 오류가 발생했습니다.');
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400)
                    alert('이미 존재하는 아이디입니다. 다른 아이디로 다시 시도하시오');
                else {
                    alert(`오류 발생: ${error.response.status}. ${error.response.data.message}`);
                }
            } else {
                alert('서버와의 연결 문제로 회원가입에 실패했습니다. 인터넷 연결을 확인하고 나중에 다시 시도해 주세요.');
            }
            console.log(error);
        }
    };
    return (
        <div className={styles.all_page}>
            <form onSubmit={handleSubmit} className={styles.login_container}>
                <h1>회원가입</h1>
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
                        value={privateToken}
                        onChange={(e) => setPrivateToken(e.target.value)}
                    />
                </div>
                <div className={styles.input_group}>
                    <label htmlFor="password">비밀번호 확인</label>
                    <input
                        type="password"
                        id="password"
                        value={verifyPrivateToken}
                        onChange={(e) => setverifyToken(e.target.value)}
                    />
                </div>
                <button type="submit" className={styles.button_group}>회원가입</button>
                <div className={styles.extra_links}>
                    <a onClick={() => navigate('/loginform')} href="/loginform">로그인</a>
                </div>
            </form>
        </div>

    );
};

export default RegisterPage;

