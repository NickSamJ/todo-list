import React from 'react';
import { useState } from 'react';
import Answers from './Answers';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Questions = ({ questions, onRemove, adminMode }) => {
  const questionsPresentation = questions
    ? questions.map((question) => (
        <div key={question.id} className='question'>
          <div className='space-beetween'>
            <p>
              <u>
                <b>Question #{question.id}</b>
              </u>
            </p>
            {adminMode ? (
              <button
                className='btn btn-danger btn-sm'
                onClick={() => {
                  let shouldDelete = window.confirm(
                    'Are you sure, you want to remove question'
                  );
                  if (shouldDelete) {
                    onRemove(question.id).then(() =>
                      alert('Question has been removed')
                    );
                  }
                }}
              >
                &times;
              </button>
            ) : null}
          </div>

          <span>{question.title}</span>

          <SyntaxHighlighter language='javascript' style={atomOneDark}>
            {question.code}
          </SyntaxHighlighter>

          <Answers answers={question.answers} parentIndex={question.id} />
          <hr />
          <br />
        </div>
      ))
    : null;
  return (
    <div className='container'>
      <h2 className='mt-5'>Javascript interview questions</h2>
      {questionsPresentation}
    </div>
  );
};

export default Questions;
