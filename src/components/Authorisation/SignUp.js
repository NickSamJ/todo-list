import React, { useContext, useState, useEffect } from "react";
import { auth, signInWithGoogle, generateUserDocument } from "../../firebase";
import { NavLink, Redirect } from "react-router-dom";
import Loader from "../Loader";
import UserContext from "../../context/User/UserContext";
import { Button, Form, Alert } from "react-bootstrap";


const SignUp = ({ history }) => {
  const user = useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    setLoading(true)
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, { displayName });
      history.push('/')
    }
    catch (error) {
      setLoading(false)
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");

  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  useEffect(() => {
    document.title = 'Sign Up'
  }, [])

  const signUpForm = <>
    {
      !loading
        ? <>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Display Name:</Form.Label>
              <Form.Control  type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="E.g: Erik"
                            onChange={event => onChangeHandler(event)}/>

              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" 
                            className=""
                            name="userEmail"
                            value={email}
                            placeholder="E.g: mishka23@gmail.com"
                            onChange={(event) => onChangeHandler(event)}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" 
                            className=""
                            name="userPassword"
                            value={password}
                            placeholder="Your Password"
                            onChange={(event) => onChangeHandler(event)}/>
            </Form.Group>
            <Button type="submit" onClick={event => {
                createUserWithEmailAndPasswordHandler(event, email, password);
              }}>
              Submit
            </Button>
          </Form>
          </>
        : <Loader />
    }
  </>

  const onGoogleAuth = () => {
    try {
      signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  }

  return (
    <>
      {
        !user
          ? <div className="text-center">
            <h1 >Sign Up</h1>
            <div className="jumbotron d-flex flex-column align-items-center text-center">
              {error !== null && (<Alert variant="danger">{error}</Alert>)}

              {signUpForm}

              <p className="text-center my-3">or</p>

              <Button onClick={onGoogleAuth}>
                      Sign In with Google
              </Button>

              <p className="text-center my-3">
                Already have an account?{" "}
                <NavLink to="/login" className="text-blue-500 hover:text-blue-600">
                        Sign in here
                </NavLink>{" "}
              </p>
            </div>
          </div>
          : <Redirect to="/" />
      }
    </>
  );
};

export default SignUp;
