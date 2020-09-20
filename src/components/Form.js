import React, { useState, useContext } from 'react';
import { AlertContext } from '../context/alert/AlertContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';

const Form = (props) => {
  const [value, setValue] = useState('');
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  // console.log(alert);
  const submitHandler = (event) => {
    event.preventDefault();
    if (value.trim()) {
      firebase
        .addNote(value.trim())
        .then(() => {
          alert.show("You've entered new note:", 'success');
        })
        .catch(() => {
          alert.show("Something went wront, new note wasn't added", 'danger');
        });
      setValue('');
    } else {
      alert.show('Enter note!', 'warning');
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className='form-ground'>
        <input
          type='text'
          className='form-control'
          placeholder='Enter Note text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Form;
