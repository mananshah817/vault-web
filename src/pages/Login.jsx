import { useState } from "react";
import { Form, Button, Card, Container, Row, Col, Alert } from "react-bootstrap";
import { login } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login(email, password);

    if (res?.token) {
      localStorage.setItem("token", res.token);
      nav("/dashboard");
    } else {
      setError(typeof res === "string" ? res : "Invalid credentials");
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <h4 className="mb-3 text-center">Login</h4>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={submit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="w-100">
                  Login
                </Button>
              </Form>

              <div className="text-center mt-3">
                New user? <Link to="/register">Register</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
