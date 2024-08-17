import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../style/edit.module.css';

const EditServiceStatus = () => {
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedServiceData, setUpdatedServiceData] = useState({
    service_name: '',
    service_label: '',
    service_url: '',
    activate: false,
    user_link1: '',
    user_link2: '',
    user_link3: '',
    user_link1_name: '',
    user_link2_name: '',
    user_link3_name: '',
    job: ''
  });
  const navigate = useNavigate();

  const fetchServiceData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/loginform');
        return;
      }

      const response = await axios.post('http://localhost:5000/get_service', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 'success') {
        setServiceData(response.data.service);
        setUpdatedServiceData({
          service_owner: response.data.service.service_owner,
          service_name: response.data.service.service_name,
          service_label: response.data.service.service_label,
          service_url: response.data.service.service_url,
          activate: response.data.service.activate,
          user_link1: response.data.service.user_link1,
          user_link2: response.data.service.user_link2,
          user_link3: response.data.service.user_link3,
          user_link1_name: response.data.service.user_link1_name,
          user_link2_name: response.data.service.user_link2_name,
          user_link3_name: response.data.service.user_link3_name,
          job: response.data.service.job
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('오류 발생:', err);
      setError('데이터를 가져오는데 문제가 발생했습니다');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchServiceData();
  }, [fetchServiceData]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/edit_service', updatedServiceData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 'success') {
        setEditMode(false);
        setServiceData(updatedServiceData);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('오류 발생:', err);
      setError('서비스 정보 수정에 실패했습니다');
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setUpdatedServiceData({
      service_name: serviceData.service_name,
      service_label: serviceData.service_label,
      service_url: serviceData.service_url,
      activate: serviceData.activate,
      user_link1: serviceData.user_link1,
      user_link2: serviceData.user_link2,
      user_link3: serviceData.user_link3,
      user_link1_name: serviceData.user_link1_name,
      user_link2_name: serviceData.user_link2_name,
      user_link3_name: serviceData.user_link3_name,
      job: serviceData.job
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedServiceData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
        <div>
          <p>Error: {error}</p>
          <button onClick={() => navigate('/loginform')}>로그인</button>
        </div>
    );
  }

  if (!serviceData) {
    return null;
  }
  const add_link = () => {

  }

  return (
      <div className={styles.all_container}>
        {editMode ? (
            <div className={styles.edit_page}>
              <h1>명함 편집</h1>
              <hr className={styles.title_divider}/>
              <form name="set_intro">
                <div>
                  <input type="text" name="service_name" value={updatedServiceData.service_name} onChange={handleInputChange} placeholder="이름"/>
                </div>
                <div>
                  <input type="text" name="url" value={updatedServiceData.service_url} onChange={handleInputChange} placeholder="URL"/>
                </div>
                <div>
                  <input type="text" name="service_label" value={updatedServiceData.service_label} onChange={handleInputChange} placeholder="자신을 소개해 보세요."/>
                </div>
                <div>
                  <p>활성화 상태</p>
                  <input type="checkbox" name="activate" checked={updatedServiceData.activate} onChange={handleInputChange}/>
                </div>
              </form>
              <form name="set_link">
                <div className={styles.table_container}>
                  <table className={styles.link_table}>
                    <tr>
                      <td rowSpan="2">
                        <select>
                          <option>인스타그램</option>
                          <option>블로그</option>
                          <option>유튜브</option>
                        </select>
                      </td>
                      <td>
                        <input name="link_input" placeholder="링크"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input name="link_explain" placeholder="링크 이름"/>
                      </td>
                    </tr>
                  </table>
                </div>
                <input type="button" value="+" onClick={add_link()}/>
              </form>
              <form>
                <input id="memo" placeholder="메모를 적어주세요."/>
              </form>
              <input type="button" value="편집 완료" onClick={handleSave}/>
              <input type="button" value="취소" onClick={handleCancel}/>
            </div>
        ) : (
            <div>
              <h1>서비스 상태</h1>
              <hr className={styles.title_divider}/>
              <h2>{serviceData.service_name}</h2>
              <p>{serviceData.service_label}</p>
              <p>{serviceData.service_url}</p>
              <p>{serviceData.activate ? '활성화' : '비활성화'}</p>
              <p>{serviceData.user_link1}</p>
              <p>{serviceData.user_link2}</p>
              <p>{serviceData.user_link3}</p>
              <p>{serviceData.user_link1_name}</p>
              <p>{serviceData.user_link2_name}</p>
              <p>{serviceData.user_link3_name}</p>
              <button onClick={handleEdit}>편집</button>
            </div>
        )}
      </div>
  );
};

export default EditServiceStatus;