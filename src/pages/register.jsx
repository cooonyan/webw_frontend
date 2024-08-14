// import React, { useState } from 'react';
// import axios from 'axios';
// import "../style/global.css";
// import "../style/register.css";
//
//
// const RegisterPage = () => {
//   const [username, setUsername] = useState('');
//   const [privateToken, setPrivateToken] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//
//     try {
//       const response = await axios.post('http://localhost:5000/register', {
//         username,
//         private_token: privateToken,
//       });
//
//       const { status, message } = response.data;
//
//       if (status === 'success') {
//         setSuccess(true);
//         setError(null);
//       } else {
//         setError(message);
//         setSuccess(false);
//       }
//     } catch (error) {
//       setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
//       console.log(error);
//       setSuccess(false);
//     }
//   };
//
//   return (
//     <div>
//       <h1>회원가입</h1>
//       <p>어쭈구 서비스에 오신 걸 환영합니다.</p>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>
//             아이디<br/>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </label><br/>
//           <label>
//             비밀번호<br/>
//             <input
//               type="password"
//               value={privateToken}
//               onChange={(e) => setPrivateToken(e.target.value)}
//             />
//           </label><br/>
//         </div>
//         <button type="submit">회원가입</button>
//       </form>
//
//       {error && <div>{error}</div>}
//       {success && <div>회원가입이 완료되었습니다.</div>}
//     </div>
//   );
// };
//
// export default RegisterPage;
//

import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [privateToken, setPrivateToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/register', {
                username,
                private_token: privateToken,
            });

            // HTTP 응답 코드에 따라 알림창 표시
            if (response.status === 200) {
                const { status, message } = response.data;
                if (status === 'success') {
                    alert('회원가입이 완료되었습니다.'); // 성공 시 알림창 표시
                } else {
                    alert(message); // 실패 시 서버에서 반환된 메시지 표시
                }
            } else {
                alert('알 수 없는 오류가 발생했습니다.'); // 기타 오류 처리
            }

        } catch (error) {
            // 네트워크 오류 또는 기타 예외 처리
            if (error.response) { // 서버가 응답했지만 오류가 발생한 경우
                if (error.response.status === 400)
                    alert('이미 존재하는 아이디입니다. 다른 아이디로 다시 시도하시오'); // 서버에서 반환한 오류 메시지 표시
                else{
                    alert(`오류 발생: ${error.response.status}. ${error.response.data.message}`); // 서버의 오류 메시지 표시
                }
            } else {
                alert('서버와의 연결 문제로 회원가입에 실패했습니다. 인터넷 연결을 확인하고 나중에 다시 시도해 주세요.'); // 네트워크 오류 처리
            }
            console.log(error);
        }
    };

    return (
        <div>
            <h1>회원가입</h1>
            <p>어쭈구 서비스에 오신 걸 환영합니다.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        아이디<br/>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label><br/>
                    <label>
                        비밀번호<br/>
                        <input
                            type="password"
                            value={privateToken}
                            onChange={(e) => setPrivateToken(e.target.value)}
                        />
                    </label><br/>
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default RegisterPage;
