import React from 'react';

const Answers = (props) => (
  <ul className='list-group'>
    {Object.entries(props.answers).map(([index, answer]) => (
      <li
        key={index + Math.random()}
        onClick={(e) =>
          e.target.classList.add(
            answer.correct
              ? 'list-group-item-success'
              : 'list-group-item-danger'
          )
        }
        className={`answer-item list-group-item`}
      >
        {answer.answer}{' '}
      </li>
    ))}
  </ul>
);

export default Answers;
