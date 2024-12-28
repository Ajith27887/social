import React, { useRef, useState } from "react";
import { Button, Card, Form, Col } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { Alert } from "bootstrap";

export default function Signup() {
  const emailref = useRef();
  const passwordRef = useRef();
  const passwordConfirm = useRef();
  const { signUp } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirm.current.value) {
      return setError("Password is mismatch");
    }
    try {
      signUp(emailref.current.value, passwordRef.current.value);
    } catch {
      setError("somthing");
    }
    console.log(emailref.current.value, "email");
  };

  return (
    <Card
      style={{
        width: "18rem",
        boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        borderRadius: "8px",
        border: "none",
      }}
    >
      <Card.Body>
        <Card.Title>Sign Up</Card.Title>
        {error && <Alert>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Control
              ref={emailref}
              required
              type="text"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group
            as={Col}
            ref={passwordRef}
            className="mt-3"
            controlId="validationCustom01"
          >
            <Form.Control required type="text" placeholder="Password" />
          </Form.Group>
          <Form.Group
            as={Col}
            className="mt-3"
            ref={passwordConfirm}
            controlId="validationCustom01"
          >
            <Form.Control required type="text" placeholder="Confirm Password" />
          </Form.Group>
          <Button className="mt-3 w-100" type="submit">
            Sign Up
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
