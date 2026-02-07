import { Container, Row, Col, Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-dark text-white min-vh-100 p-3">
          <h5>Vault App</h5>
          <Nav className="flex-column">
            <Nav.Link className="text-white" onClick={() => nav("/dashboard")}>Dashboard</Nav.Link>
            <Nav.Link className="text-white" onClick={() => nav("/banks")}>Banks</Nav.Link>
            <Nav.Link className="text-white" onClick={() => nav("/cards")}>Cards</Nav.Link>
            <Button variant="outline-light" className="mt-3" onClick={logout}>Logout</Button>
          </Nav>
        </Col>
        <Col md={10} className="p-4">
          <Navbar bg="light" className="mb-3 rounded">
            <Navbar.Brand>Personal Vault</Navbar.Brand>
          </Navbar>
          {children}
        </Col>
      </Row>
    </Container>
  );
}
