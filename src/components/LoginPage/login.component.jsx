import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/Logo.png';
import React, { useState } from 'react';
import { Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../slices/authSlice';

const Login = ({ toggleForm, successMessage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(login({ email, password })).then((action) => {
            console.log(action);
            if (action.meta.requestStatus === 'fulfilled') {
                navigate('/');
            }
        });
    };

    return (
        <div className="col-lg-6 col-12 text-center align-content-center">
            <div className="col-6 mx-auto">
                <h5>
                    <img src={logo} alt="Logo.png" /> SIMS PPOB
                </h5>
                {successMessage && (
                    <Alert variant="success">
                        <h6>{successMessage}</h6>
                    </Alert>
                )}
                <h5 className="pb-4">Masuk Atau Buat Akun <br/> Untuk Memulai</h5>
                <Form onSubmit={handleLogin}>
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

                    <InputGroup className="mb-5">
                        <InputGroup.Text id="basic-addon2">🔒</InputGroup.Text>
                        <Form.Control
                            placeholder="Masukkan Password Anda"
                            aria-label="Password"
                            aria-describedby="basic-addon2"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputGroup.Text id="show-password">👁</InputGroup.Text>
                    </InputGroup>

                    <Button variant="danger" type="submit" className="w-100" disabled={loading}>
                        {loading ? 'Loading...' : 'Masuk'}
                    </Button>
                </Form>
                <p className="text-secondary">
                    belum punya akun? registrasi{' '}
                    <span
                        className="text-danger fw-bold"
                        onClick={() => toggleForm()}
                        style={{ cursor: 'pointer' }}
                    >
                        di sini
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
