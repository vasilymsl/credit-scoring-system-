import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../Routes';
import { getBasket } from '../modules/api';

export const NavbarComp = () => {
  // При клике на иконку корзины - отправляем запрос (видно в Network)
  const handleBasketClick = () => {
    getBasket();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={ROUTES.HOME}>Система скоринга</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={ROUTES.HOME}>{ROUTE_LABELS.HOME}</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.SERVICES}>{ROUTE_LABELS.SERVICES}</Nav.Link>
          </Nav>
          <Nav>
             {/* Иконка корзины - при клике отправляется запрос GET /api/applications/basket */}
             <Nav.Link onClick={handleBasketClick} style={{ cursor: 'pointer' }}>🛒</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

