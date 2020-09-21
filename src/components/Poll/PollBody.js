import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Loader from '../Loader';
import Answer from './Answer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const PollBody = ({
  pollInfo,
  correctAnswers,
  currentQuestion,
  answerHandler,
  disabled,
  nextQuestion,
  nextButtonDisabled,
  isFinish,
  resetPoll,
}) => {
  const [randomSortedItems, setRandomSortedItems] = useState([]);
  const [loadedAnswers, setLoadedAnswers] = useState(false);
  useEffect(() => {
    pollInfo.questions[currentQuestion].answerVariants.sort((a, b) =>
      Math.round(Math.random() * 10 - 5)
    );
    setLoadedAnswers(true);
    return () => {};
  }, []);

  const answers = (
    <>
      {loadedAnswers ? (
        pollInfo.questions[currentQuestion].answerVariants.map((answer) => {
          return (
            <Answer
              answerHandler={answerHandler}
              answer={answer.answer}
              isCorrect={answer.isCorrect}
              disabled={disabled}
            />
          );
        })
      ) : (
        <Loader />
      )}
    </>
  );
  const finishColor =
    pollInfo.questions.length / correctAnswers <= 2 ? 'green' : 'red';
  const finishCartBody = (
    <div className='finish-cart-body'>
      <Card.Title>
        <h2>Poll is over!</h2>
      </Card.Title>
      <Card.Text>
        <h4>
          <strong style={{ color: finishColor }}>{correctAnswers}</strong>{' '}
          Correct of {pollInfo.questions.length} questions
        </h4>
      </Card.Text>
      <Button as={NavLink} to='/polls' variant='dark'>
        Return to polls
      </Button>
      <Button onClick={resetPoll} variant='warning'>
        Reset poll
      </Button>
    </div>
  );

  return (
    <div>
      <div className='poll-body-overlay'></div>
      <div className='poll-body'>
        {pollInfo && pollInfo.questions ? (
          <Card>
            {!isFinish && (
              <Card.Header
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <strong>Question: {currentQuestion + 1}</strong>
                <span>
                  <i>Correct:</i> {correctAnswers} / {pollInfo.questions.length}
                </span>
              </Card.Header>
            )}
            <Card.Body>
              {isFinish ? (
                <>{finishCartBody}</>
              ) : (
                <>
                  {pollInfo.questions[currentQuestion].question && (
                    <Card.Title>
                      {pollInfo.questions[currentQuestion].question}
                    </Card.Title>
                  )}

                  {pollInfo.questions[currentQuestion].code && (
                    <Card.Text>
                      <SyntaxHighlighter
                        language='javascript'
                        style={atomOneDark}
                      >
                        {pollInfo.questions[currentQuestion].code}
                      </SyntaxHighlighter>
                    </Card.Text>
                  )}
                  {answers}
                  <Button
                    onClick={nextQuestion}
                    style={{ marginTop: 20 }}
                    variant='primary'
                    disabled={nextButtonDisabled}
                  >
                    Next question
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default PollBody;
