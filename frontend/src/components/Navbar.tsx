import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../Routes';
import { useEffect } from 'react';
import { getBasket } from '../modules/api';

export const NavbarComp = () => {
  // Вызываем запрос корзины при загрузке Navbar (при старте приложения)
  useEffect(() => {
    getBasket();
  }, []);

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#0b1f35' }}>
      <Container>
        <Navbar.Brand as={Link} to={ROUTES.HOME} style={{ color: 'white', fontWeight: 'bold' }}>
          🏛️ Оценка кредитоспособности
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
          <span style={{ color: 'white' }}>☰</span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={ROUTES.HOME} style={{ color: 'white' }}>{ROUTE_LABELS.HOME}</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.SERVICES} style={{ color: 'white' }}>{ROUTE_LABELS.SERVICES}</Nav.Link>
          </Nav>
          <Nav>
             <Nav.Link style={{ color: 'white' }}>📋 Моя заявка</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

