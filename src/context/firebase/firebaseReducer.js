import { SHOW_LOADER, ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, ADD_QUESTION, FETCH_QUESTIONS, REMOVE_QUESTION, ADD_TOPIC, FETCH_TOPICS, REMOVE_TOPIC, SET_CURRENT_TOPIC } from "../types";



// import React, { useImperativeHandle } from 'react';
const handlers = {
    [SHOW_LOADER]: state => ({...state, loading: true}),

    // Notes
    [ADD_NOTE]: (state, {payload}) => ({
        ...state, 
        notes: [...state.notes, payload]
    }),
    [FETCH_NOTES]: (state, {payload}) => ({...state, notes: payload, loading: false}),
    [REMOVE_NOTE]: (state, {payload}) => ({
        ...state,
        notes: state.notes.filter(note => note.id !== payload),
    }),

    // Questions
    [ADD_QUESTION]: (state, {payload}) => ({
        ...state,
        questions: state.questions ? [...state.questions, payload] : [payload],
        loading: false
    }),
    [FETCH_QUESTIONS]: (state, {payload}) => ({...state, questions: payload, loading: false }),
    [REMOVE_QUESTION]: (state, {payload}) => ({
        ...state,
        questions: state.questions.filter(question => question.id !== payload),
    }),

    // Topics
    [ADD_TOPIC]: (state, {payload}) => ({
        ...state,
        topics: state.topics ? [...state.topics, payload] : payload,
        loading: false
    }),
    [FETCH_TOPICS]: (state, {payload}) => ({
        ...state, 
        topics: payload, 
        loading: false,
        // setCurrentTopic:  payload  ? Object.keys(payload)[0] : 'default',
    }),
    [REMOVE_TOPIC]: (state, {payload}) => ({
        ...state,
        topics: state.topics.filter(topic => topic.id !== payload)
    }),
    [SET_CURRENT_TOPIC]: (state, {payload}) => ({...state, currentTopic: payload}), 

    DEFAULT : state => state,
}

const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};

export default firebaseReducer;