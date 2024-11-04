import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import './HomePage.css';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

const Topup = () => {
    const [topup, setTopup] = useState('');

    // Masih Error
    const handleTopup = async (event) => {
        event.preventDefault();
    
        const token = sessionStorage.getItem('token');
    
        const amount = parseFloat(topup);
        if (isNaN(amount) || amount <= 0) {
            console.error('Invalid top-up amount. It should be a positive number.');
            return;
        }
    
        const payload = {
            top_up_amount: amount,
            transaction_type: 'TOPUP'
        };
    
        try {
            const response = await fetch(`${BASE_URL}/topup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Top-up successful:', data);
    
                const newBalance = data.data.balance;
                console.log('New balance:', newBalance);
            } else {
                const errorText = await response.text();
                console.error('Top-up failed:', response.status, response.statusText);
                console.error('Response text:', errorText);
    
                try {
                    const errorData = JSON.parse(errorText);
                    console.error('Error data:', errorData);
                } catch (parseError) {
                    console.error('Error response is not valid JSON:', parseError);
                }
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="row">
            <h6>Silahkan Masukkan</h6>
            <h4>Nominal Top Up</h4>
            <div className="col-9 pt-5">
                <Form onSubmit={handleTopup}>
                    <InputGroup className="mb-4">
                        <Form.Control
                            placeholder="Masukkan nominal top up"
                            aria-label="nominal top up"
                            type="number"
                            min="10000"
                            max="1000000"
                            value={topup}
                            onChange={(e) => setTopup(e.target.value)}
                        />
                    </InputGroup>

                    <Button type="submit" 
                        className={`btn btn-link text-white text-decoration-none ${topup ? 'bg-danger' : 'bg-secondary'} rounded w-100`}
                        disabled={!topup}
                        style={{ cursor: !topup ? 'not-allowed' : 'pointer' }}
                    >
                        Top Up
                    </Button>
                </Form>
            </div>
            <div className="mb-4 col-3 pt-5">
                <div className="d-flex justify-content-between mb-4">
                    {[10000, 20000, 50000].map((amount) => (
                        <Button
                            variant='outline-secondary'
                            key={amount}
                            className="mx-1" 
                            style={{ minWidth: '80px' }}
                            onClick={() => setTopup(amount)}
                        >
                            {amount.toLocaleString()}
                        </Button>
                    ))}
                </div>
                <div className="d-flex justify-content-between">
                    {[100000, 250000, 500000].map((amount) => (
                        <Button
                            variant='outline-secondary'
                            key={amount}
                            className="mx-1" 
                            style={{ minWidth: '80px' }}
                            onClick={() => setTopup(amount)}
                        >
                            {amount.toLocaleString()}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Topup;