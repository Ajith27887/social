import React, { useRef, useState } from "react";
import { Button, Card, Form, Col, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailref = useRef();
  const passwordRef = useRef();
  const { login, currentUser, error, setError } = useAuth();
  // const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      login(emailref.current.value, passwordRef.current.value);
      if (!error) {
        navigate("/");
      }
    } catch (error) {
      setError("Account doesn't Exists");
    }
    console.log(emailref.current.value, "email");
  };

  return (
    <>
      <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
        <Card
          style={{
            width: "18rem",
            boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
            borderRadius: "8px",
            border: "none",
          }}
        >
          <Card.Body>
            <Card.Title>LogIn</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Control
                  ref={emailref}
                  required
                  type="text"
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group as={Col} type="password" className="mt-3">
                <Form.Control
                  ref={passwordRef}
                  required
                  type="text"
                  placeholder="Password"
                />
              </Form.Group>
              <Button className="mt-3 w-100" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
          <div className="text-center my-3 w-100">
            Don't have an account?{" "}
            <Link className="text-decoration-none text-success" to="/Signup">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
}
