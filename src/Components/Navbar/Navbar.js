import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import Card from "react-bootstrap/Card";
import { useAuth } from "../../Context/AuthContext";
import { auth } from "../../firebase";
import "./Navbar.scss";
import Suggestion from "../Suggestion/Suggestion";

function NavBar() {
  const navigate = useNavigate(),
    [error, setError] = useState(""),
    { currentUser } = useAuth(),
    imageUrl = currentUser && currentUser.photoURL;

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/Login");
      })
      .catch((error) => {
        setError("Somthig wrong");
      });
  };

  console.log(auth, "name");

  const handleNavigation = (path) => {
    if (currentUser) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link onClick={() => handleNavigation("/")}>
                News Feeds
              </Nav.Link>
              <Nav.Link onClick={() => handleNavigation("/Suggestion")}>
                Suggestion
              </Nav.Link>
            </Nav>
            <Nav>
              <div className="profile-container">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Profile"
                    className="mx-3 profile-icon"
                  />
                ) : (
                  <div className="">
                    <VscAccount
                      className="mx-3 profile-icon"
                      style={{ fontSize: "2rem" }}
                    />
                    {currentUser && currentUser.displayName}
                  </div>
                )}
                <Card className="profile-card">
                  <Card.Body>
                    <Card.Title>
                      {currentUser && currentUser.displayName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-left">
                      <b>Email :</b> {currentUser && currentUser.email}
                    </Card.Subtitle>
                    <Button variant="outline-danger" onClick={handleLogOut}>
                      Log Out
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavBar;
