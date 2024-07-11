import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ServicePage = () => {
    const [serviceData, setServiceData] = useState(null);
    const [error, setError] = useState(false);
    const location = useLocation().pathname.substring(1);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/service', { service_url: location });
                console.log(response);
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
        return <div>404 Not Found</div>;
    }

    if (!serviceData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Service Page</h1>
            <div>
                <h2>{serviceData.service_name}</h2>
                <p>{serviceData.service_label}</p>
            </div>
        </div>
    );
};

export default ServicePage;

