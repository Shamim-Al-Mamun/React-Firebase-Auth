import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

function Resetpassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { resetPassword } = useUserAuth();
  const params = new URLSearchParams(window.location.search);

  const code = params.get("oobCode");
  console.log(code);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword(code, password);
      setMessage("Password has been updated successfully");
    } catch (err) {
      setError(err.message);
    }
  };
  console.log(password);
  return (
    <>
      <div className="p-4 box mt-3 text-center">
        <h2 className="mb-3">Reset Password</h2>
        {message ? (
          <>
            <div className="p-4 box mt-3 text-center">
              <div className="my-2">{message}</div>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </Button>
              </div>
            </div>
          </>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit">
                Save
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

export default Resetpassword;
