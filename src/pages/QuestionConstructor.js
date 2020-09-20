import React from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';
// import Questions from '../components/Questions';
import QuestionAddForm from '../components/Poll/QuestionAddForm';
import { useState } from 'react';
import Loader from '../components/Loader';
import { useEffect } from 'react';
import Questions from '../components/Questions';
import { DEFAULT_QUESTION_AMOUNT } from '../util/Setup';
import TopicAddForm from '../components/Poll/TopicAddForm';
import TopicSelect from '../components/Poll/TopicSelect';


const QuestionConstructor = (props) => {



    const {loading, fetchQuestions, addQuestion, questions, removeQuestion, topics, fetchTopics, setCurrentTopic, currentTopic} = useContext(FirebaseContext)

    const initialState = {
        title: '', 
        code: '', 
        answers: new Array(DEFAULT_QUESTION_AMOUNT).fill({answer: '', correct:false}),
        
    }
    const [submitDisbled, setSubmitDisbled] = useState(false)
    const [question, setQuestion] = useState(initialState)
    // let [topic, setTopic] = useState("")
    
    useEffect(() => {
        document.title = "Add question"
        // initialize questions on page load
        fetchTopics()
        fetchQuestions()
    }, [])
    useEffect(() => {
        updateSubmitState()
    }, [question])
    useEffect(() => {
        console.log("UseEffect Question Constructor: ", currentTopic)
        fetchQuestions()

    }, [currentTopic])

    const updateSubmitState = () => {

        if(question.title === "" || question.code === ""){
            setSubmitDisbled(true)
            return 
        }
        const trueAnswers = question.answers.filter((answer) => answer.correct == true && answer.answer != "")
        if(trueAnswers.length === 0){
            setSubmitDisbled(true)
            return
        }
        setSubmitDisbled(false)
    }


    const updateTopic = (e) => {
        console.log("Question Constructor: ", currentTopic);
        setCurrentTopic(e.target.value)
    }

    const fieldHandler = (e) =>{
        const field = e.target.getAttribute('name')
        setQuestion({...question, [field]: e.target.value})
    }

    const answersHandler = (e, answerorder) => {
        let answers = [...question.answers]
        answers[answerorder] = {
            correct: answers[answerorder].correct || false,
            answer: e.target.value,
        }
        setQuestion({...question, answers: answers})
    }

    const correctHandler = (e, answerorder) => {
        let answers = [...question.answers]
        answers[answerorder] = {
            ...question.answers[answerorder],
            correct: !answers[answerorder].correct,
        }
        setQuestion({...question, answers: answers})
    }
    
    const processSubmit =  (e) => {

        e.preventDefault()
        let filledAnswers = question.answers.filter(answer =>{
                return answer.answer != ""
            }
        )
        if(question.answers.length != filledAnswers.length){
            addQuestion({...question, answers: filledAnswers})
        }else{
            addQuestion(question)
        }
        setQuestion(initialState)
    }
    return(
        <div className="row mt-3">
            <div className="col-md-6 col-xs-12">

                <TopicAddForm />
                <TopicSelect 
                    topics={topics}
                    onchange={updateTopic}
                    value={currentTopic}/>  
                <QuestionAddForm 
                    titleValue={question.title}
                    codeValue={question.code}
                    answersValue={question.answers}
                    submitDisbled={submitDisbled}

                    submitHandler={processSubmit}

                    fieldHandler={fieldHandler}
                    answersHandler={answersHandler}
                    correctHandler={correctHandler}/>
            </div>
            <div className="col-md-6 col-xs-12 admin-questions-list">
                {loading
                ? <Loader />
                : <Questions 
                    questions={questions} 
                    adminMode={true} 
                    onRemove={removeQuestion}/>}
            </div>
            <hr/>
        </div>
    )
};

export default QuestionConstructor;