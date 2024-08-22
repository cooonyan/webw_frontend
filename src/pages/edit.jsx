import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../style/edit.module.css';

const EditServiceStatus = () => {
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [links, setLinks] = useState([{ name: '', link: '' }]);
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
        setLinks([
          { name: response.data.service.user_link1_name, link: response.data.service.user_link1 },
          { name: response.data.service.user_link2_name, link: response.data.service.user_link2 },
          { name: response.data.service.user_link3_name, link: response.data.service.user_link3 }
        ].filter(link => link.name && link.link));
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
      const updatedLinks = links.reduce((acc, link, index) => {
        acc[`user_link${index + 1}`] = link.link;
        acc[`user_link${index + 1}_name`] = link.name ? link.name : '';
        return acc;
      }, {});

      const response = await axios.post('http://localhost:5000/edit_service', { ...updatedServiceData, ...updatedLinks }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 'success') {
        console.log("success",response.data.message);
        setEditMode(false);
        setServiceData({ ...updatedServiceData, ...updatedLinks });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      if (err.response.status === 409){ {
        alert('다른 사용자가 사용중인 URL입니다. 다른 URL로 다시 시도해주세요.');
        return;
      }}
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
    setLinks([
      { name: serviceData.user_link1_name, link: serviceData.user_link1 },
      { name: serviceData.user_link2_name, link: serviceData.user_link2 },
      { name: serviceData.user_link3_name, link: serviceData.user_link3 }
    ].filter(link => link.name && link.link));
  };

  const handleInputChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const addLink = () => {
    if (links.length < 3) {
      setLinks([...links, { name: '', link: '' }]);
    }
  };

  const removeLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    setUpdatedServiceData((prevData) => ({
      ...prevData,
      [`user_link${index + 1}`]: '',
      [`user_link${index + 1}_name`]: ''
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
        <div>
          <p>오류 : {error}</p>
          <button onClick={() => navigate('/loginform')}>로그인</button>
        </div>
    );
  }

  if (!serviceData) {
    return null;
  }

  return (
      <div className={styles.all_container}>
        {editMode ? (
            <div className={styles.edit_page}>
              <h1>명함 편집</h1>
              <hr className={styles.title_divider} />
              <form name="set_intro">
                <div>
                  <input type="text" name="service_name" value={updatedServiceData.service_name} onChange={(e) => setUpdatedServiceData({ ...updatedServiceData, service_name: e.target.value })} placeholder="이름" />
                </div>
                <div>
                  <input type="text" name="service_url" value={updatedServiceData.service_url} onChange={(e) => setUpdatedServiceData({ ...updatedServiceData, service_url: e.target.value })} placeholder="URL" />
                </div>
                <div>
                  <input type="text" name="service_label" value={updatedServiceData.service_label} onChange={(e) => setUpdatedServiceData({ ...updatedServiceData, service_label: e.target.value })} placeholder="자신을 소개해 보세요." />
                </div>
                <div className={styles.checkbox_container}>
                  <p>활성화 상태</p>
                  <input type="checkbox" name="activate" checked={updatedServiceData.activate} onChange={(e) => setUpdatedServiceData({ ...updatedServiceData, activate: e.target.checked })} className={styles.checkbox_container}/>
                </div>
              </form>
              <form name="set_link">
                <div className={styles.table_container}>
                  {links.map((link, index) => (
                      <div key={index}>
                        <table key={index} className={styles.link_table}>
                          <tbody>
                          <tr>
                            <td rowSpan="2">
                              <select className={styles.select_box} value={link.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)}>
                                <option value="">선택</option>
                                <option value="인스타그램">인스타그램</option>
                                <option value="블로그">블로그</option>
                                <option value="유튜브">유튜브</option>
                              </select>
                            </td>
                            <td>
                              <input name="link_input" value={link.link} onChange={(e) => handleInputChange(index, 'link', e.target.value)} placeholder="링크" />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <button type="button" onClick={() => removeLink(index)} className={styles.add_button}>삭제</button>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                        <br />
                      </div>
                  ))}
                </div>
                {links.length < 3 && <button type="button" className={styles.add_button} onClick={addLink}>+</button>}
              </form>
              <button type="button" onClick={handleSave} className={styles.add_button}>편집 완료</button>
              <button type="button" onClick={handleCancel} className={styles.add_button}>취소</button>
            </div>
        ) : (
            <div>
              <h1>서비스 상태</h1>
              <hr className={styles.title_divider}/>
              <h2>사용자 명 : {serviceData.service_name ? serviceData.service_name : '등록되지 않음'}</h2>
              <p>설명 : {serviceData.service_label ? serviceData.service_label : '등록되지 않음'}</p>
              <p>등록된 URL : {serviceData.service_url ? serviceData.service_url : '등록되지 않음'}</p>
              <p>서비스 상태 : {serviceData.activate ? '활성화' : '비활성화'}</p>
              <p>등록된 링크</p>
              <p>링크1 : {serviceData.user_link1_name ? serviceData.user_link1_name + ' 등록됨' : '등록되지 않음'}</p>
              <p>링크2 : {serviceData.user_link2_name ? serviceData.user_link2_name + ' 등록됨': '등록되지 않음'}</p>
              <p>링크3 : {serviceData.user_link3_name ? serviceData.user_link3_name + ' 등록됨': '등록되지 않음'}</p>
              <button onClick={handleEdit}>편집</button>
            </div>
        )}
      </div>
  );
};

export default EditServiceStatus;