import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
          owner: response.data.service.service_owner,
          service_name: response.data.service.service_name,
          service_label: response.data.service.service_label,
          service_url: response.data.service.service_url,
          activate: response.data.service.activate,
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

  return (
    <div>
      {editMode ? (
        <div>
          <h2>서비스 정보 수정</h2>
          <label>
            이름:
            <input
              type="text"
              name="service_name"
              value={updatedServiceData.service_name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            설명:
            <input
              type="text"
              name="service_label"
              value={updatedServiceData.service_label}
              onChange={handleInputChange}
            />
          </label>
          <label>
            URL:
            <input
              type="text"
              name="service_url"
              value={updatedServiceData.service_url}
              onChange={handleInputChange}
            />
          </label>
          <label>
            활성 여부:
            <input
              type="checkbox"
              name="activate"
              checked={updatedServiceData.activate}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleSave}>저장</button>
          <button onClick={handleCancel}>취소</button>
        </div>
      ) : (
        <div>
          <h2>조회 성공</h2>
          <p>조회 하는데 사용된 소유자명 : {serviceData.service_owner}</p>
          <p>등록된 이름 : {serviceData.service_name}</p>
          <p>등록된 설명 : {serviceData.service_label}</p>
          <p>등록된 url : {serviceData.service_url}</p>
          <p>활성 여부: {serviceData.activate ? '예' : '아뇨'}</p>
          <button onClick={handleEdit}>수정</button>
        </div>
      )}
    </div>
  );
};

export default EditServiceStatus;
