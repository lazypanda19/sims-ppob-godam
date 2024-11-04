import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

const Banners = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const token = sessionStorage.getItem('token');
                
                if (!token) {
                    throw new Error("No token found");
                }

                const response = await axios.get(`${BASE_URL}/banner`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setBanners(response.data.data);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch banners');
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    if (loading) return <p>Loading banners...</p>;
    if (error) return <p>Error loading banners: {error}</p>;

    return (
        <div>
            <h5 className='pt-5 pb-3'>Temukan Promo Menarik</h5>
            {banners.length > 0 ? (
                <div className="overflow-auto scroll-hidden" style={{ whiteSpace: 'nowrap', padding: '10px 0' }}>
                    <div className="d-flex flex-row">
                        {banners.map((banner) => (
                            <div key={banner.banner_name} className="d-flex flex-column align-items-center mx-2 pointer">
                                <img 
                                    src={banner.banner_image} 
                                    alt={banner.banner_name} 
                                    style={{ borderRadius: '15px', height: 'auto' }} 
                                />
                                <span className="d-block text-center" style={{ fontSize: '12px' }}>{banner.banner_name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No Banner available.</p>
            )}
        </div>
    );
};

export default Banners;