import React from 'react';
import AnswerInput from './AnswerInput';
import { useEffect } from 'react';

const AnswerInputs = (props) => {
  let inputs = [];
  for (let i = 0; i < props.amount; i++) {
    inputs.push(
      <AnswerInput
        key={i}
        orderNumber={i}
        answersValue={props.answersValue}
        answersHandler={props.answersHandler}
        correctHandler={props.correctHandler}
      />
    );
  }

  return <React.Fragment>{inputs}</React.Fragment>;
};

export default AnswerInputs;
