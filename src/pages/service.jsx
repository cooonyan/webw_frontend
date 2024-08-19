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
                console.log("b", service);

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

    const getLogo = (name) => {
        console.log("get",name);
        if (name === 'instagram') {
            return instalogo;
        } else if (name === 'naver') {
            return naverlogo;
        } else if (name === 'youtube') {
            return youtubelogo;
        }
        return null;
    };

    const userLinks = [
        { name: serviceData.user_link1_name, link: serviceData.user_link1, logo: getLogo(serviceData.user_link1_name) },
        { name: serviceData.user_link2_name, link: serviceData.user_link2, logo: getLogo(serviceData.user_link2_name) },
        { name: serviceData.user_link3_name, link: serviceData.user_link3, logo: getLogo(serviceData.user_link3_name) }
    ].filter(item => item.link);


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
                        <div className={styles.one_line}>{serviceData.service_label}</div>
                    </div>
                </div>
                <div className={styles.content_boxes}>
                    {userLinks.map((item, index) => (
                        <a key={index} href={item.link} className={styles.content_box} target="_blank" rel="noopener noreferrer">
                            <img src={item.logo} className={styles.box_icon} alt="Icon" />
                            <div className={styles.box_content}>
                                <div className={styles.box_title}>{item.name}</div>
                                <div className={styles.box_subtitle}>one line introduction</div>
                            </div>
                        </a>
                    ))}




                    {/*<a href="https://www.instagram.com/" className={styles.content_box} target="_blank"*/}
                    {/*   rel="noopener noreferrer">*/}
                    {/*    <img src={instalogo} className={styles.box_icon} alt="Icon 1"/>*/}
                    {/*    <div className={styles.box_content}>*/}
                    {/*        <div className={styles.box_title}>user instagram</div>*/}
                    {/*        <div className={styles.box_subtitle}>one line introduction</div>*/}
                    {/*    </div>*/}
                    {/*</a>*/}

                    {/*<a href="https://section.blog.naver.com/BlogHome.nhn" className={styles.content_box} target="_blank"*/}
                    {/*   rel="noopener noreferrer">*/}
                    {/*    <img src={naverlogo} className={styles.box_icon} alt="Icon 2"/>*/}
                    {/*    <div className={styles.box_content}>*/}
                    {/*        <div className={styles.box_title}>user blog</div>*/}
                    {/*        <div className={styles.box_subtitle}>one line introduction</div>*/}
                    {/*    </div>*/}
                    {/*</a>*/}

                    {/*<a href="https://www.youtube.com/" className={styles.content_box} target="_blank"*/}
                    {/*   rel="noopener noreferrer">*/}
                    {/*    <img src={youtubelogo} className={styles.box_icon} alt="Icon 3"/>*/}
                    {/*    <div className={styles.box_content}>*/}
                    {/*        <div className={styles.box_title}>youtube</div>*/}
                    {/*        <div className={styles.box_subtitle}>one line introduction</div>*/}
                    {/*    </div>*/}
                    {/*</a>*/}

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
