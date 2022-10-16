import React from "react";


export default function Quiz(props){
  return (
        <div className="quiz-box">
              <p>
                {props.items.question}
              </p>
              <div className="quiz-type">
                    <span>Category : {props.items.category}</span>
                    <span>Type : {props.items.type}</span>
                    <span>Difficulty : {props.items.difficulty}</span>
              </div>
              <ul className="quiz-options">
                {props.items.options.map((item)=>{
                      
                    return (<li key={item} className={
                      (props.items.userAnswer===item?'selected ':'')
                      +(props.isDone && props.items.correct_answer===item?'correct-answer ':'')
                      +(props.isDone && props.items.userAnswer===item && item!==props.items.correct_answer?'wrong-answer':'')}
                         onClick={(event)=>props.optionClick(event,props.items)}>
                         {item}
                      </li>)
                })}
              </ul>
        </div>
        )
}