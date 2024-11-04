import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance } from '../../slices/authSlice';
import './HomePage.css';

const Balance = () => {
    const dispatch = useDispatch();
    const balance = useSelector((state) => state.auth.balance);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const [isShowBalance, setIsShowBalance] = useState(false);

    const toggleBalanceVisibility = () => {
        setIsShowBalance((prev) => !prev);
    };
    
    useEffect(() => {
        dispatch(fetchBalance());
    }, [dispatch]);

    if (loading) return <p>Loading Balance...</p>;
    if (error) return <p>Error loading Balance: {error}</p>;

    const formattedBalance = balance ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
    }).format(balance.balance) : 'Rp.0';

    return (
        <div className="col-lg-7 col-12 balance-bg text-white">
            <h6>Saldo Anda</h6>
            <h2 className="fw-bold py-2">{isShowBalance ? formattedBalance : 'Rp •••••••'}</h2>
            <button onClick={toggleBalanceVisibility} className="btn btn-link text-white">
                {isShowBalance ? 'Sembunyikan saldo' : 'Lihat saldo'}
            </button>
        </div>
    )
}

export default Balance;