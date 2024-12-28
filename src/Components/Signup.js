import React, { useRef } from "react";
import { Button, Card, Form, Col } from "react-bootstrap";

export default function Signup() {
  const emailref = useRef();
  const password = useRef();
  const passwordConfirm = useRef();

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
        <Form>
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
            ref={password}
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
            <Form.Control required type="text" placeholder="Password Confirm" />
          </Form.Group>
          <Button className="mt-3 w-100" type="submit">
            Sign Up
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
