import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/Logo.png';
import React, { useState } from 'react';
import {Button, Form, InputGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../slices/authSlice';

const Register = ({toggleForm}) => {
    const [email,setEmail] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleRegister = (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
            setPasswordError('Password tidak sama');
            return;
        } else {
            setPasswordError('');
        }
    
        dispatch(register({
            email,
            first_name: firstName,
            last_name: lastName,
            password
        })).then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
                const Message = action.payload.data.message;
                toggleForm(Message);
            }
        });
    };

    return (
        <div className="col-lg-6 col-12 text-center align-content-center">
            <div className="col-6 mx-auto">
                <h5>
                <img src={logo} alt="Logo.png" /> SIMS PPOB
                </h5>
                <h5 className="py-4">Lengkapi data untuk <br/> membuat akun</h5>
                <Form onSubmit={handleRegister}>
                    <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="Masukkan Email Anda"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon2">👤</InputGroup.Text>
                        <Form.Control
                            placeholder="Nama Depan"
                            aria-label="Nama Depan"
                            aria-describedby="basic-addon2"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon3">👤</InputGroup.Text>
                        <Form.Control
                            placeholder="Nama Belakang"
                            aria-label="Nama Belakang"
                            aria-describedby="basic-addon3"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon4">🔒</InputGroup.Text>
                        <Form.Control
                            placeholder="Masukkan Password Anda"
                            aria-label="Password"
                            aria-describedby="basic-addon4"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputGroup.Text id="show-password">👁</InputGroup.Text>
                    </InputGroup>

                    <InputGroup className="">
                        <InputGroup.Text id="basic-addon5">🔒</InputGroup.Text>
                        <Form.Control
                            placeholder="Konfirmasi Password"
                            aria-label="Password"
                            aria-describedby="basic-addon5"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <InputGroup.Text id="show-password">👁</InputGroup.Text>
                    </InputGroup>
                    {passwordError && (
                        <div className="text-danger text-end">
                            <small>{passwordError}</small>
                        </div>
                    )}

                    <Button variant="danger" type="submit" className="w-100 mt-5" disabled={loading}>
                        {loading ? 'Loading...' : 'Registrasi'}
                    </Button>
                </Form>
                <p className="text-secondary">Sudah punya akun? login <span className="text-danger fw-bold" onClick={() => toggleForm()} style={{ cursor:'pointer' }}>di sini</span></p>
            </div>
        </div>
    )
}

export default Register;
