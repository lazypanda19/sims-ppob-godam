import React, { useState } from 'react';
import './HomePage.css';

const Account = () => {
    const [topup, setTopup] = useState('');

    const handleTopUp = () => {
        console.log('topup')
    };

    return (
        <div className="row">
            <h6>Silahkan Masukkan</h6>
            <h4>Nominal Top Up</h4>
            <button onClick={handleTopUp} className="btn btn-link text-white bg-danger rounded">
                {isShowBalance ? 'Sembunyikan saldo' : 'Lihat saldo'}
            </button>
        </div>
    )
}

export default Account;