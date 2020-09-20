import React, { useContext } from 'react';
import { questions1 } from '../testData/questions1';
import Questions from '../components/Questions';
import { useState } from 'react';
import FirebaseState from '../context/firebase/FirebaseState';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import { useEffect } from 'react';

const Poll = ({ match }) => {
  let currentData;

  const {
    fetchQuestions,
    questions,
    currentTopic,
    setCurrentTopic,
  } = useContext(FirebaseContext);
  useEffect(() => {
    document.title = 'Questions';
    console.log(match.params.id);

    setCurrentTopic(match.params.id);
  }, []);

  useEffect(() => {
    fetchQuestions();
    console.log(questions);
  }, [currentTopic]);

  const updateAll = () => {
    // setCurrentTopic(match.params.id)
    fetchQuestions();

    console.log(questions);
    console.log('here');
  };
  // switch (+match.params.id){
  //     case 1: currentData = questions1; break;
  // }
  // currentData = questions

  return (
    <div>
      <button onClick={updateAll}>update all</button>
      <Questions questions={questions} />
    </div>
  );
};

export default Poll;
