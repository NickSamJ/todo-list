import React from 'react';

const AnswerInput = (props) => {
    const id = props.orderNumber

   return (
        <div className="space-beetween">
        <input type="text" 
            name={`answerVariant-${id}`} 
            value={props.answersValue[id].answer} 
            onChange={(e) => props.answersHandler(e, id)}/>
        
        <input type="radio" 
            name={`answerVariant-${id}-correct`} 
            value="true"
            checked={props.answersValue[id].correct}
            onChange={(e) => {}} 
            onClick={(e) => props.correctHandler(e, id)} 
            /><br/>
        </div>
   )
};

export default AnswerInput;