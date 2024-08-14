import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from '../style/service.module.css';
import center_photo from '../img/home.png';
import logo from '../img/logo.jpg';

const ServicePage = () => {
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
                <button onClick={() => window.location.reload()}>재시도</button>
            </div>
        );
    }

    if (!serviceData) {
        return <div>Loading...</div>; // 로딩 스피너 추가 가능
    }

    return (
        <div class="all_page">
            <div class="display">
                <div class="background">
                    <div class="clarity"></div>
                    <div class="logout">로그아웃</div>
                </div>
                <div class="blog_head">
                    <div class="head_title">
                        <a class="link_name" href="/" style="text-decoration: none; color: white;">USER'S STORY</a>
                    </div>
                    <div class="profile">
                        <img src="profile.jpg" />
                            <div class="profile_name">NAME</div>
                            <div class="profile_job">JOB</div>
                            <div class="one_line">One line introduction</div>
                    </div>
                </div>
                <div class="content_boxes">
                    <a href="https://www.instagram.com/" class="content_box" target="_blank">
                        <img src="instagram.jpg" class="box_icon" alt="Icon 1" />
                            <div class="box_content">
                                <div class="box_title">user instagram</div>
                                <div class="box_subtitle">one line introduction</div>
                            </div>

                    </a>

                    <a href="https://section.blog.naver.com/BlogHome.nhn" class="content_box" target="_blank">
                        <img src="naverblog.png" class="box_icon" alt="Icon 2" />
                            <div class="box_content">
                                <div class="box_title">user blog</div>
                                <div class="box_subtitle">one line introduction</div>
                            </div>
                    </a>

                    <a href="https://www.youtube.com/" class="content_box" target="_blank">
                        <img src="youtube.jpg" class="box_icon" alt="Icon 3" />
                            <div class="box_content">
                                <div class="box_title">youtube</div>
                                <div class="box_subtitle">one line introduction</div>
                            </div>
                    </a>

                    <div class="content_box memo_box">
                        <div class="box_content">
                            <div class="box_title">Memo</div>
                            <textarea class="memo_area" placeholder=""></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;
