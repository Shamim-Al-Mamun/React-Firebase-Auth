import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="p-4 box mt-3 text-center">
        <h2 className="mb-3">Hello Welcome</h2>
        <div className="p-2 box mt-4 text-center">{user && user.email}</div>
        <div className="d-grid mt-4 gap-2">
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
