import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfileComponent from './components/HomePage/profile.component';
import BalanceComponent from './components/HomePage/balance.component';
import ServiceComponent from './components/HomePage/service.component';
import BannerComponent from './components/HomePage/banner.component';
import TopupComponent from './components/HomePage/topup.component';
import AccountComponent from './components/HomePage/account.component';
import HistoryComponent from './components/HomePage/history.component';
import NavbarComponent from './components/Layouts/navbar.component';

const HomePage = () => {
    return (
        <>
            <NavbarComponent />
            <div className="container">
                <Routes>
                    <Route path="/" element={
                        <>
                        <div className="row py-4">
                            <ProfileComponent />
                            <BalanceComponent />
                        </div>
                            <ServiceComponent />
                            <BannerComponent />
                        </>
                    } />
                    <Route path="topup" element={
                        <>
                            <div className="row py-4">
                                <ProfileComponent />
                                <BalanceComponent />
                            </div>
                            <TopupComponent />
                        </>
                    } />
                    <Route path="history" element={
                        <>
                            <div className="row py-4">
                                <ProfileComponent />
                                <BalanceComponent />
                            </div>
                            <HistoryComponent />
                        </>
                    } />
                    <Route path="account" element={
                        <AccountComponent />
                    } />
                </Routes>
            </div>
        </>
    );
};

export default HomePage;
