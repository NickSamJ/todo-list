import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, Col, ListGroup, Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import { firestore } from '../firebase';
import { LanguageCreate } from '../service/DIctionaryService';

const Dictionary = (props) => {
  const [languages, setLanguages] = useState([]);
  const [words, setWords] = useState([]);
  const [currentLanguageId, setCurrentLanguageId] = useState(
    'zr9Cby6jE5RTx418yzy5'
  );
  const [pending, setPending] = useState(true);

  useEffect(() => {
    document.title = 'Dictionary';

    const fetchLanguages = async () => {
      const dict = await firestore.collection('languages').get();

      setLanguages(
        dict.docs.map((lang) => {
          return { ...lang.data(), id: lang.id };
        })
      );
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchWords = async () => {
      setPending(true);
      const words = await firestore
        .collection('words')
        .where('language', '==', currentLanguageId)
        .get();
      setWords(words.docs.map((word) => word.data()));
      setPending(false);
    };
    fetchWords();
  }, [currentLanguageId]);

  const languageHandler = (event) => {
    setCurrentLanguageId(event.target.value);
  };

  const wordsListItems = (
    <ListGroup variant='flush'>
      {words
        .sort((a, b) => b.createdate.seconds - a.createdate.seconds)
        .map((word) => {
          return (
            <ListGroup.Item key={word.word}>
              <Row>
                <Col md={{ span: 3, order: 1 }} xs={{ span: 6, order: 1 }}>
                  <i>{word.word}</i>
                </Col>
                <Col md={{ span: 3, order: 2 }} xs={{ span: 6, order: 2 }}>
                  <strong>{word.translate}</strong>
                </Col>
                <Col
                  md={{ span: 3, order: 3, offset: 0 }}
                  xs={{ span: 6, order: 3, offset: 6 }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: word.comment,
                    }}
                  ></div>
                </Col>
                <Col
                  md={{ span: 3, order: 4, offset: 0 }}
                  xs={{ span: 6, order: 4, offset: 6 }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: word.usefulLinks,
                    }}
                  ></div>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  );

  return (
    <div>
      <select
        name=''
        id=''
        value={currentLanguageId}
        onChange={languageHandler}
      >
        {languages.map((lang) => (
          <option key={lang.title} value={lang.id}>
            {lang.title}
          </option>
        ))}
      </select>
      <br />
      <br />
      <br />

      {pending ? (
        <Loader />
      ) : (
        <>
          {words.length > 0 ? (
            <>{wordsListItems}</>
          ) : (
            <Alert variant='warning'>
              {' '}
              No words was added for this language yet
            </Alert>
          )}
        </>
      )}
    </div>
  );
};

export default Dictionary;
