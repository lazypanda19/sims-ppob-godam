import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const token = sessionStorage.getItem('token');
                
                if (!token) {
                    throw new Error("No token found");
                }

                const response = await axios.get(`${BASE_URL}/services`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setServices(response.data.data);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch services');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) return <p>Loading services...</p>;
    if (error) return <p>Error loading services: {error}</p>;

    return (
        <div>
            {services.length > 0 ? (
                <div className="d-flex flex-row justify-content-between">
                    {services.map((service) => (
                        <div key={service.service_code} className="d-flex flex-column align-items-center mx-2 pointer">
                            <img 
                                src={service.service_icon} 
                                alt={service.service_name} 
                                style={{ maxWidth: '60px' }} 
                            />
                            <span className="d-block text-center" style={{ fontSize: '12px' }}>{service.service_name}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No services available.</p>
            )}
        </div>
    );
};

export default Services;