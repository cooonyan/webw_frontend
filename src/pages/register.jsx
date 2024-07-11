import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [privateToken, setPrivateToken] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        private_token: privateToken,
      });

      const { status, message } = response.data;

      if (status === 'success') {
        setSuccess(true);
        setError(null);
      } else {
        setError(message);
        setSuccess(false);
      }
    } catch (error) {
      setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
      console.log(error);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          password:
          <input
            type="password"
            value={privateToken}
            onChange={(e) => setPrivateToken(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>

      {error && <div>{error}</div>}
      {success && <div>회원가입이 완료되었습니다.</div>}
    </div>
  );
};

export default RegisterPage;
