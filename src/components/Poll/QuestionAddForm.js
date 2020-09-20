import React from 'react';
import AnswerInputs from './AnswerInputs';

const QuestionAddForm = (props) => {

    return (
        <form onSubmit={props.submitHandler} id="add-question-form">

            <label htmlFor="question-title-textarea">Enter question</label>
            <textarea 
                    type="text" 
                    name="title" 
                    id="question-title-textarea" 
                    cols="30" 
                    rows="8" 
                    required={true}
                    onChange={props.fieldHandler} 
                    value={props.titleValue}
                    placeholder="Enter cquestion"/>

            <label htmlFor="question-code-textarea">Enter code</label>
            <textarea name="code" 
                      id="question-code-textarea" 
                      cols="30" 
                      rows="8" 
                      required={true}
                      value={props.codeValue}
                      onChange={props.fieldHandler}
                      placeholder="Enter code"/><br/>

            <div className="space-beetween">
           <label >Enter possible answers</label>
            <span>Correct?</span>
            </div>
            <AnswerInputs amount="4" 
                          answersValue={props.answersValue} 
                          answersHandler={props.answersHandler}
                          correctHandler={props.correctHandler}/>

            <button type="submit" className="mt-2" disabled={props.submitDisbled}>Add question</button>
        </form>
    )
};

export default QuestionAddForm;