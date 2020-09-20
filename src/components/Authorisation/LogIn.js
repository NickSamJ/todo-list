import React, { useState, useEffect } from "react";
import { signInWithGoogle, auth } from "../../firebase";
import { NavLink, Redirect } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/User/UserContext";
import Loader from "../Loader";
import { Button, Form, Alert } from "react-bootstrap";


const LogIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false)

  const user = useContext(UserContext)

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    setLoader(true)
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      setLoader(false)
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  useEffect(() => {
    document.title = 'Login'
  }, [])

  const signInWithEmailForm = <>{!loader
    ?<>
    <Form >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" 
                      className=""
                      name="userEmail"
                      value={email}
                      placeholder="E.g: mishka23@gmail.com"
                      onChange={(event) => onChangeHandler(event)}
         />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" 
                      className=""
                      name="userPassword"
                      value={password}
                      placeholder="Your Password"
                      onChange={(event) => onChangeHandler(event)}/>
      </Form.Group>

      <Button variant="primary" type="submit"  onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>
        Submit
      </Button>
    </Form>
    </>
    : <Loader />}</>



  return (
    <>
      {!user
        ? <div className="text-center">
          <h1 >Sign In</h1>
          <div className="jumbotron d-flex flex-column align-items-center text-center">
            {error !== null && <Alert variant="danger">{error}</Alert>}

            {signInWithEmailForm}
            <p className="text-center my-3">or</p>
            <Button
                  className=""
                  onClick={() => {
                    signInWithGoogle();
                  }}
                >
                  Sign in with Google
            </Button>
            <p className="text-center">
              Don't have an account?{" "}
              <NavLink to="/signup">
                Sign up here
						</NavLink>
              <br />{" "}
              <NavLink to="reset-password" >
                Forgot Password?
          </NavLink>
            </p>
          </div>
        </div>
        : <Redirect to="/" />}
      {/* :  <div>Hey there</div>} */}
    </>
  );
};

export default LogIn;
