// 테스트 페이지입니다. 서비스 페이지 아닙니다 만드실 필요 없습니다.
import React from 'react';
import '../App.css';
import requestbackend from '../modules/requestjsondata'

function Test() {

    // 모듈화 성공했다 야호
    const handlePostRequest = async () => {
        let input_data = document.querySelector('input').value;
        requestbackend("a", input_data);
      };

  return (
    <div className='Container'>
        <h1>Test Page</h1>
        <input type="text" placeholder="Type something" />
        <button onClick={handlePostRequest} style={{ cursor: 'pointer' }}>Send POST Request</button>
    </div>
    
  );
}

export default Test;