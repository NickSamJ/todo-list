import React, { Fragment, useContext, useEffect } from 'react';
import Form from '../components/Form';
import Notes from '../components/Notes';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import Loader from '../components/Loader';
import PollsMenu from '../components/Poll/Pollsmenu';
import UserContext from '../context/User/UserContext';

const Home = (props) => {
  // let notes = new Array(3)
  //         .fill('')
  //         .map((_, i) => ({id: i, title: `Note ${i + 1}`}));

  const { loading, notes, fetchNotes, removeNote } = useContext(
    FirebaseContext
  );
  const user = useContext(UserContext);

  if (user) {
    const { photoURL, displayName, email } = user;
  }

  useEffect(() => {
    document.title = 'All is here';
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      hello
      {/* {email ? email: null} */}
      {/* todo app goes in comments */}
      {/* <br />
            <Form />
            <hr />
            {loading
            ? <Loader />
            : <Notes notes={notes}
                    onRemove={removeNote}
            />} */}
      {/* <PollsMenu /> */}
    </Fragment>
  );
};
export default Home;
