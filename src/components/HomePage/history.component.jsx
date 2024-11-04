import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = sessionStorage.getItem('token');
                
                if (!token) {
                    throw new Error("No token found");
                }

                const response = await axios.get(`${BASE_URL}/transaction/history`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setHistory(response.data.data.records);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch history');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return <p>Loading History...</p>;
    if (error) return <p>Error loading History: {error}</p>;

    return (
        <div>
            {history.length > 0 ? (
                <div className="">
                    {history.map((singleHistory) => (
                        <div key={singleHistory.invoice_number} className="card row py-3 my-4 mx-2 justify-content-between">
                            <div>
                                <h6 className={singleHistory.transaction_type === 'TOPUP' ? 'text-success' : 'text-danger'}>
                                    {singleHistory.total_amount.toLocaleString()}
                                </h6>
                                <small>{new Date(singleHistory.created_on).toLocaleString(undefined, {
                                    timeZoneName: 'short'
                                })}</small>
                            </div>
                            <div style={{ flex: 1, textAlign: 'justify' }}>
                                {singleHistory.description}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Maaf tidak ada history transaksi saat ini</p>
            )}
        </div>
    );
};

export default History;
