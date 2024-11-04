import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../slices/authSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.auth.profile);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>Error loading profile: {error}</p>;

    if (!profile) {
        return <p>No profile data available.</p>;
    }

    return (
        <div className="col-lg-5 col-12 py-4">
            <img 
                src={profile.profile_image} 
                alt="Profile" 
                style={{ maxWidth: '50px' }} 
            />
            <div>
                <h6>Selamat Datang,</h6>
                <h5>{profile.first_name} {profile.last_name}</h5>
            </div>
        </div>
    );
}

export default Profile;
