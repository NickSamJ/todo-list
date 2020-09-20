import React, { useState } from "react";
import { auth } from "../../firebase";
import { NavLink, Redirect } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/User/UserContext";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";


const ResetPassword = ({history}) => {
    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [error, setError] = useState(null);


    const user = useContext(UserContext)

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        }
    };

    const sendResetEmail = event => {
        event.preventDefault();
        auth
            .sendPasswordResetEmail(email)
            .then(() => {
                setEmailHasBeenSent(true);
                setTimeout(() => { 
                    setEmailHasBeenSent(false);
                    history.push('/')
                }, 1000);
            })
            .catch(() => {
                setError("Error resetting password");
            });
    };
    return (
        <>
            {!user
                ? <div className="mt-8">

                    <h2 className="text-center">
                        Reset your Password
                    </h2>
                    <div className="jumbotron">
                        <Row>
                            <Col xs={{span: 10, offset:1}} md={{span: 6, offset:3}}>
                                <Form>
                                    {emailHasBeenSent && (
                                        <Alert variant="success">
                                            An email has been sent to you!
                                        </Alert >
                                    )}
                                    {error !== null && (
                                        <Alert variant="danger">
                                            {error}
                                        </Alert>
                                    )}
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email"
                                            className=""
                                            name="userEmail"
                                            value={email}
                                            placeholder="Input your Email"
                                            onChange={onChangeHandler}
                                        />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                </Form.Text>
                                    </Form.Group>
                                    <Button type="submit"
                                        onClick={event => {
                                            sendResetEmail(event);
                                        }}>
                                        Send me a reset link
                                    </Button>
                                </Form>
                                <NavLink
                                    to="/login"
                                    className="my-2 text-blue-700 hover:text-blue-800 text-center block"
                                >
                                    &larr; back to sign in page
                                </NavLink>
                            </Col>
                        </Row>
                    </div>
                </div>
                : <Redirect to='/' />
            }
        </>

    );
};

export default ResetPassword;
