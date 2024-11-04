import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.png';

const NavbarComponent = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="border">
            <Container className="d-flex justify-content-between align-items-center">
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <span><img src={logo} alt="" /> SIMS PPOB</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to="/topup">Top Up</Nav.Link>
                        <Nav.Link as={Link} to="/history">Transaction</Nav.Link>
                        <Nav.Link as={Link} to="/account">Akun</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;