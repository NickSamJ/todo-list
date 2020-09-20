import React, {useReducer} from 'react';
import axios from 'axios';
import { FirebaseContext } from './firebaseContext';
import firebaseReducer from './firebaseReducer';
import { SHOW_LOADER, REMOVE_NOTE, ADD_NOTE, FETCH_NOTES, ADD_QUESTION, FETCH_QUESTIONS, REMOVE_QUESTION, ADD_TOPIC, FETCH_TOPICS, REMOVE_TOPIC, SET_CURRENT_TOPIC } from '../types';

const url = process.env.REACT_APP_DB_URL;

const FirebaseState = ({children}) => {
    const initialState = {
        notes: [],
        questions: [],
        currentTopic: '',
        loading: false  
    }
    const [state, dispatch] = useReducer(firebaseReducer, initialState);

    const showLoader = () => dispatch({type: SHOW_LOADER});

        // Topics 
        const setCurrentTopic =  async topic => {
            dispatch({
                type: SET_CURRENT_TOPIC,
                payload: topic 
            })
            console.log("Topic is updatesd")
        }

        const addTopic = async topic => {
            showLoader()
            topic = {topic}
            try{
                const res = await axios.post(`${url}/topics.json`, topic)
                 const payload = {
                     ...topic,
                     id: res.data.name
                 }
                 dispatch({
                     type: ADD_TOPIC,
                     payload
                 })
            }catch(e){
                throw new Error(e.message)
            }
        }
    
        const fetchTopics = async () => {
            showLoader();
            const res = await axios.get(`${url}/topics.json`);
            let payload;
            if(res.data){
                payload = Object.keys(res.data).map(key => {
                    return {
                        ...res.data[key],
                        id: key
                    } 
                })
            }
    
            dispatch({
                type: FETCH_TOPICS,
                payload
            })
        }
        const removeTopic = async id => {
            await axios.delete(`${url}/topics/${id}.json`);
    
            dispatch({
                type: REMOVE_TOPIC,
                payload: id
            })
        }
    

    // Questions 
    const addQuestion = async question => {
        showLoader()
        try{
            const res = await axios.post(`${url}/questions${state.currentTopic}.json`, question)

             const payload = {
                 ...question,
                 id: res.data.name
             }
             dispatch({
                 type: ADD_QUESTION,
                 payload
             })
        }catch(e){
            throw new Error(e.message)
        }
    }

    const fetchQuestions = async (currtop) => {
        showLoader();
        console.log("Fetchh is now in Firebase state", state.currentTopic);
        // if(currtop){ await setCurrentTopic(currtop)}
        const res = await axios.get(`${url}/questions${state.currentTopic}.json`);
        let payload;
        console.log('payload goes here', payload, res)
        if(res.data){
            payload = Object.keys(res.data).map(key => {
                return {
                    ...res.data[key],
                    id: key
                } 
            })
        }

        dispatch({
            type: FETCH_QUESTIONS,
            payload
        })
    }
    const removeQuestion = async id => {
        await axios.delete(`${url}/questions${state.currentTopic}/${id}.json`);

        dispatch({
            type: REMOVE_QUESTION,
            payload: id
        })
    }

    // Notes
    const fetchNotes = async () => {
        showLoader();
        const res = await axios.get(`${url}/notes.json`);
        const payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            } 
        })
        dispatch({
            type: FETCH_NOTES,
            payload
        })
        // console.log("Fetch note data " + res.data);
    }

    const addNote = async title => {
        const note = {
            title, date: new Date().toJSON()
        }
        try{
            const res = await axios.post(`${url}/notes.json`, note);
            console.log("Add note data " + res.data);
            const payload = {
                ...note,
                id: res.data.name
            }
            dispatch({
                type: ADD_NOTE,
                payload
            })
        }catch(e){
            throw new Error(e.message)
        }
    }

    const removeNote = async id => {
        await axios.delete(`${url}/notes/${id}.json`);

        dispatch({
            type: REMOVE_NOTE,
            payload: id
        })
    }

    return(
        <FirebaseContext.Provider value={{
            showLoader, fetchNotes, addNote, removeNote,
            addQuestion, fetchQuestions, removeQuestion, 
            addTopic, fetchTopics, removeTopic, setCurrentTopic,
            loading: state.loading,
            notes: state.notes,
            questions: state.questions,
            topics: state.topics,
            currentTopic: state.currentTopic,
        }}>
            {children}
        </FirebaseContext.Provider>
    )
};

export default FirebaseState;