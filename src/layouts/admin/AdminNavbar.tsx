import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { iAuthNavbarProps } from '../interface/interface';
import { NavLink } from 'react-router-dom';

export const AdminNavbar = ({ displayName, imagenUrl }: iAuthNavbarProps) => {
  const companyName = process.env.REACT_APP_COMPANY || 'Hola Mundo';
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="ml-5">
          <img alt="" src={imagenUrl} width="30" height="30" className="d-inline-block align-top" />{' '}
          {companyName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '200px' }} navbarScroll>
            <NavLink
              to={'/'}
              className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}>
              Inicio
            </NavLink>
            <NavLink
              to={'/product'}
              className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}>
              Producto
            </NavLink>
            <NavDropdown title="Inventario" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Entradas</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Salidas</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <div>{displayName}</div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
