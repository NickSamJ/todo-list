import React from 'react';
import { useContext, useState } from 'react';
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import Alert from '../Alert';
import { AlertContext } from '../../context/alert/AlertContext';

const TopicAddForm = (props) => {
  const [value, setValue] = useState('');
  const { addTopic } = useContext(FirebaseContext);
  const alert = useContext(AlertContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (value.trim()) {
      addTopic(value.trim())
        .then(() => {
          alert.show('Topic successfully added');
        })
        .catch(() => {
          alert.show('Somethig went wrong');
        });
    } else {
      alert.show('Please, type topic name to add');
    }
    setValue('');
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Enter topic'
      />
    </form>
  );
};

export default TopicAddForm;
