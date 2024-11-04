import Login from './components/LoginPage/login.component';
import Register from './components/LoginPage/register.component';
import loginIllustration from './assets/Illustrasi Login.png'
import { useState } from 'react';

const LoginPage = () => {

  const [isRegister, setIsRegister] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const toggleForm = (successMessage) => {
    setIsRegister(!isRegister);
    if (successMessage) {
      setSuccessMessage(successMessage);
    }
  };

  return (
    <>
      <div className="container-fluid px-0">
            <div className="d-flex">
              {isRegister ? <Register toggleForm={toggleForm} /> : <Login toggleForm={toggleForm} successMessage={successMessage} />}
              <div className="col-lg-6 col-12 bg-dark">
                  <img src={loginIllustration} className="img-fluid" alt="Illustrasi Login.png" style={{ width: '100%', maxHeight:'100vh', objectFit: "cover" }} />
              </div>
            </div>
        </div>
    </>
  )
}

export default LoginPage;
