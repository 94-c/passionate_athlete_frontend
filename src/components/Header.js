import React, { useState, useEffect } from 'react';
import { parseJwt } from '../utils/Jwt.js';
import axios from 'axios';
import '../styles/Header.css';

const Header = () => {
  const [userName, setUserName] = useState('');
  const [continuousAttendance, setContinuousAttendance] = useState(0);

  useEffect(() => {
    // 토큰 가져오기
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user = token ? parseJwt(token) : null;

    // 사용자 이름 가져오기
    const storedUserName = localStorage.getItem('userName') || sessionStorage.getItem('userName');
    setUserName(storedUserName);

    // API 호출하여 연속 출석일 정보 가져오기
    if (token) {
      axios.get('/api/getContinuousAttendance', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setContinuousAttendance(response.data.continuousAttendanceCount);
      })
      .catch(error => {
        console.error('Error fetching continuous attendance:', error);
      });
    }
  }, []);

  return (
    <div className="header-container">
      <div className="info-section">
        <p className="attendance-info">
          {userName ? (
            <span>
              <span>{userName} 님은 연속 </span>
              <span className="highlight">{continuousAttendance}</span>
              <span>일 출석 중입니다.</span>
            </span>
          ) : (
            <span>로그인 해주세요.</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Header;
