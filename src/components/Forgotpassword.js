import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { forgotPassword } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await forgotPassword(email);
      setMessage(true);
    } catch (err) {
      setError(err.message);
    }
  };
  console.log(email);
  return (
    <>
      <div className="p-4 box mt-3 text-center">
        <h2 className="mb-3">Forgot Password</h2>
        {message ? (
          <div className="p-4 box mt-3 text-center">
            <div>Password reset link has been sent to</div>
            <a
              href="https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              {email}
            </a>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="text"
                placeholder="Enter your mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit">
                Send
              </Button>
            </div>
          </Form>
        )}
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
}

export default Forgotpassword;
