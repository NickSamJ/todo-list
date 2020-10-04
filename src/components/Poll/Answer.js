import React, { useState, useEffect } from 'react';
import { Button, Row } from 'react-bootstrap';

const Answer = ({ answer, isCorrect, answerHandler, disabled }) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setClicked(false);
    return () => {
      setClicked(false);
    };
  }, [answer]);
  const buttonStyle = clicked ? (isCorrect ? 'success' : 'danger') : 'light';

  return (
    <Row>
      <Button
        onClick={() => {
          answerHandler(isCorrect);
          setClicked(true);
        }}
        variant={buttonStyle}
        disabled={disabled}
        style={{ marginTop: 20, textAlign: 'left' }}
        block
      >
        {answer}
      </Button>
    </Row>
  );
};

export default Answer;
