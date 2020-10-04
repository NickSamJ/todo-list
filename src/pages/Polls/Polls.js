import React, { useState } from 'react';
import { firestore } from '../../firebase';
import { useEffect } from 'react';
import { Row, Col, Card, CardColumns, Container } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Loader from '../../components/Loader';

const Polls = ({ history, urlAlias }) => {
  const [pollsLoaded, setPollsLoaded] = useState(false);
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    document.title = 'Polls';
    const fetchPolls = async () => {
      const polls = await firestore.collection('polls').get();

      setPolls(
        polls.docs.map((poll) => {
          return { ...poll.data(), id: poll.id };
        })
      );
      setPollsLoaded(true);
    };

    fetchPolls();
  }, []);

  const pollsList = (
    <>
      {polls.map((poll) => {
        return (
          <Card
            // bg={variant.toLowerCase()}
            key={poll.title}
          >
            {/*Here should be section with the image like  this:
                            <Card.Img variant="top" src="holder.js/100px160" />*/}

            <Card.Body>
              <Card.Title>
                <Link to={`/${urlAlias}/${poll.alias}`}>{poll.title}</Link>{' '}
              </Card.Title>
              {poll.description && (
                <div className='card-text'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: poll.description,
                    }}
                  ></div>
                </div>
              )}

              <Card.Text>
                <small className='text-muted'>
                  Created:{' '}
                  {new Date(
                    poll.createdate.seconds * 1000
                  ).toLocaleDateString()}
                </small>
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
  return (
    <Container style={{ paddingTop: '4rem' }}>
      <h1>Polls ✅</h1>

      {pollsLoaded ? <CardColumns> {pollsList}</CardColumns> : <Loader />}
    </Container>
  );
};

export default withRouter(Polls);
