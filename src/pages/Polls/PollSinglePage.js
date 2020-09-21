import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { firestore } from '../../firebase';
import { Card, Button } from 'react-bootstrap';
import PollBody from '../../components/Poll/PollBody';

const PollSinglePage = ({ match, history }) => {
  const [pollInfo, setPoll] = useState({});
  const [loaded, setLoaded] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [isFinish, setIsFinish] = useState(false);

  //   const []

  const pollId = match.params.id;

  useEffect(() => {
    const fetchPoll = async () => {
      const pollRaw = await firestore
        .collection('polls')
        .where('alias', '==', pollId)
        .get();
      let pollData;
      pollRaw.forEach((poll) => (pollData = poll.data()));
      if (pollData) {
        document.title = pollData.title;
        setPoll(pollData);
        setLoaded(true);
      } else {
        history.push('/page-not-found');
      }
    };
    fetchPoll();

    return () => {
      // refresh polling
      setCurrentQuestion(0);
    };
  }, []);

  //   const handleAnswer

  const pollBody = (
    <>
      {JSON.stringify(pollInfo)}
      {pollInfo && pollInfo.questions ? (
        <Card>
          <Card.Header>
            Correct: {correctAnswers} / {pollInfo.questions.length}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              {pollInfo.questions[currentQuestion].question}
            </Card.Title>
            <Card.Text>{pollInfo.questions[currentQuestion].code}</Card.Text>
            <Button variant='primary'>Go somewhere</Button>
          </Card.Body>
        </Card>
      ) : null}
    </>
  );

  const handleAnswer = (isTrue) => {
    if (isTrue) {
      console.log('Handler is working');
      setCorrectAnswers((old) => old + 1);
    }
    setDisabled(true);
    setNextButtonDisabled(false);
  };

  const handleNextQuestion = () => {
    console.log(pollInfo.questions.length);
    if (currentQuestion + 1 == pollInfo.questions.length) {
      setIsFinish(true);
    } else {
      setCurrentQuestion((old) => old + 1);
      setNextButtonDisabled(true);
      setDisabled(false);
    }
  };
  const resetPoll = () => {
    setNextButtonDisabled(true);
    setDisabled(false);
    setIsFinish(false);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
  };
  return (
    <div>
      {loaded ? (
        <PollBody
          pollInfo={pollInfo}
          currentQuestion={currentQuestion}
          correctAnswers={correctAnswers}
          answerHandler={handleAnswer}
          nextQuestion={handleNextQuestion}
          nextButtonDisabled={nextButtonDisabled}
          disabled={disabled}
          isFinish={isFinish}
          resetPoll={resetPoll}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PollSinglePage;
