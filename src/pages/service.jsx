import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from '../style/plus.module.css';
import profile from '../img/profile.jpg';
import instalogo from '../img/instagram.jpg';
import naverlogo from '../img/naverblog.png';
import youtubelogo from '../img/youtube.jpg';



const ServicePage = () => {
    const navigate = useNavigate();
    const [serviceData, setServiceData] = useState(null);
    const [error, setError] = useState(false);
    const location = useLocation().pathname.substring(1);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/service', { service_url: location });
                console.log("a",response);
                const { status, service } = response.data;

                if (status === 'success') {
                    setServiceData(service);
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
            }
        };

        fetchServiceData();
    }, [location]);

    if (error) {
        return (
            <div>
                <h1>404 Not Found</h1>
                <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
            </div>
        );
    }

    if (!serviceData) {
        return <div>Loading...</div>; // 로딩 스피너 추가 가능
    }


    return (
        <div className={styles.all_page}>
            <div className={styles.display}>
                <div className={styles.background}>
                    <div className={styles.clarity}></div>
                    <div className={styles.logout}>로그아웃</div>
                </div>
                <div className={styles.blog_head}>
                    <div className={styles.head_title}>
                        <a className={styles.link_name} href="/" style={{textDecoration: 'none', color: 'white'}}>{serviceData.service_name}'S
                            STORY</a>
                    </div>
                    <div className={styles.profile}>
                        <img src={profile} alt="Profile"/>
                        <div className={styles.profile_name}>{serviceData.service_name}</div>
                        <div className={styles.profile_job}>JOB</div>
                        <div className={styles.one_line}>One line introduction</div>
                    </div>
                </div>
                <div className={styles.content_boxes}>
                    <a href="https://www.instagram.com/" className={styles.content_box} target="_blank"
                       rel="noopener noreferrer">
                        <img src={instalogo} className={styles.box_icon} alt="Icon 1"/>
                        <div className={styles.box_content}>
                            <div className={styles.box_title}>user instagram</div>
                            <div className={styles.box_subtitle}>one line introduction</div>
                        </div>
                    </a>

                    <a href="https://section.blog.naver.com/BlogHome.nhn" className={styles.content_box} target="_blank"
                       rel="noopener noreferrer">
                        <img src={naverlogo} className={styles.box_icon} alt="Icon 2"/>
                        <div className={styles.box_content}>
                            <div className={styles.box_title}>user blog</div>
                            <div className={styles.box_subtitle}>one line introduction</div>
                        </div>
                    </a>

                    <a href="https://www.youtube.com/" className={styles.content_box} target="_blank"
                       rel="noopener noreferrer">
                        <img src={youtubelogo} className={styles.box_icon} alt="Icon 3"/>
                        <div className={styles.box_content}>
                            <div className={styles.box_title}>youtube</div>
                            <div className={styles.box_subtitle}>one line introduction</div>
                        </div>
                    </a>

                    <div className={`${styles.content_box} ${styles.memo_box}`}>
                        <div className={styles.box_content}>
                            <div className={styles.box_title}>Memo</div>
                            <textarea className={styles.memo_area} placeholder=""></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;
