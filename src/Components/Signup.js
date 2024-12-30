import React, { useRef, useState } from "react";
import { Button, Card, Form, Col, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nameRef = useRef(),
    emailref = useRef(),
    passwordRef = useRef(),
    passwordConfirm = useRef(),
    navigate = useNavigate(),
    { signUp } = useAuth(),
    [error, setError] = useState(""),
    handleSubmit = async (e) => {
      e.preventDefault();

      if (passwordRef.current.value !== passwordConfirm.current.value) {
        return setError("Password is mismatch");
      }

      try {
        setError("");
        const userCredential = await signUp(
          emailref.current.value,
          passwordRef.current.value,
          nameRef.current.value
        );
        console.log("Profile updated");

        navigate("/Login");
        // setSuccess("Profile updated");
      } catch (error) {
        console.error("Error during signup:", error);
        setError("somthing went ");
      }
    };

  return (
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
          <Card.Title>Sign Up</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Col}>
              <Form.Control
                ref={nameRef}
                required
                type="text"
                placeholder="Name"
                className="mb-3"
              />
            </Form.Group>
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
            <Form.Group as={Col} type="password" className="mt-3">
              <Form.Control
                required
                ref={passwordConfirm}
                type="text"
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Button className="mt-3 w-100" type="submit">
              Sign Up
            </Button>
          </Form>
          <div className="text-center my-3 w-100">
            Have an account?{" "}
            <Link className="text-decoration-none text-secondary" to="/Login">
              Log In
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
