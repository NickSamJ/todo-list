import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useContext } from 'react';
import { AlertContext } from '../context/alert/AlertContext';

const Notes = ({ notes, onRemove }) => {
  const alert = useContext(AlertContext);
  return (
    <TransitionGroup conponent='ul' className='list-group'>
      {notes.map((note) => (
        <CSSTransition key={note.id} classNames={'note'} timeout={800}>
          <li className='list-group-item note' key={note.id}>
            <div>
              <strong>{note.title}</strong>
              <small>{note.date}</small>
            </div>
            <button
              type='button'
              className='btn btn-danger btn-sm'
              onClick={() =>
                onRemove(note.id).then(() =>
                  alert.show('Note has been correctly removed', 'warning')
                )
              }
            >
              &times;
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Notes;
