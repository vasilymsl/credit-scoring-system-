import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../Routes';
import { useEffect } from 'react';
import { getBasket } from '../modules/api';

export const NavbarComp = () => {
  // Вызываем запрос корзины при загрузке Navbar (при старте приложения)
  // Это нужно для демонстрации запроса в Network (по требованию преподавателя)
  useEffect(() => {
    getBasket();
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={ROUTES.HOME}>Scoring App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={ROUTES.HOME}>{ROUTE_LABELS.HOME}</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.SERVICES}>{ROUTE_LABELS.SERVICES}</Nav.Link>
          </Nav>
          <Nav>
             {/* Иконка корзины (визуально) */}
             <Nav.Link>🛒 Заявка</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

