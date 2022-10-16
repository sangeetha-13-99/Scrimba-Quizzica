import React from "react";
import { nanoid } from "nanoid";
import Quiz from "./Quiz";
export default function QuizzicaQuiz() {
  const [quizData, setQuizData] = React.useState([]);
  const [isDone,setIsDone] = React.useState(false);
  const [outputData,setOutputData]=React.useState([{attempted:0,unattempted:0}])
  const [play,setPlay]=React.useState(false);
  React.useEffect(() => {
          fetch("https://opentdb.com/api.php?amount=10")
            .then((res) => res.json())
            .then((data) => getData(data.results));
      }, [play]);

  function getData(data) {
    function getShuffledArray(array) {
      let len = array.length,
        currentIndex;
      for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
        let randIndex = Math.floor(Math.random() * (currentIndex + 1));
        var temp = array[currentIndex];
        array[currentIndex] = array[randIndex];
        array[randIndex] = temp;
      }
      return array;
    }
    let quizDataArray = data.map((quizData) => {
      return {
        ...quizData,
        id: nanoid(),
        userAnswer:'',
        options: getShuffledArray([
          quizData.correct_answer,
          ...quizData.incorrect_answers
        ])
      };
    });
    setQuizData(quizDataArray);
  }
  function btnCheckClickHandler(){
    setIsDone(true);
    let attempt=(quizData.filter(item=>{
      return (item.userAnswer!=='' && (item.userAnswer===item.correct_answer)) 
    })).length;
    let unattempt=(quizData.filter(item=>{
      return (item.userAnswer==='') 
    })).length;
    setOutputData(
        {attempted:attempt,unattempted:unattempt}
    )
    
  }
  function btnPlayClickHandler(){
    setPlay(prev=>!prev);
    setIsDone(prev=>!prev);
    setOutputData({attempted:0,unattempted:0});
    setQuizData([]);
  }

  function optionClickHandler(event,quizItem){
    setQuizData(prev=>{
      return prev.map(item=>{
       return (item.id===quizItem.id?{...item,userAnswer:event.target.textContent}:item);
      })
    });
  }
  return (
    <div>
      {(quizData.length>0) && 
        (<div className="quiz-box-outer">
          {quizData.map((quiz) => {
            return <Quiz key={quiz.id} items={quiz} optionClick={optionClickHandler} isDone={isDone}/>;
          })}
          <div className="button">
            {!isDone && <button onClick={btnCheckClickHandler}>Check Answers</button>}
            {isDone && <button onClick={btnPlayClickHandler}>Play Again</button>}
            {isDone && <p className="quiz-ouput">
              <span> correct : {outputData.attempted} Questions</span>
              <span> wrong : {(10-outputData.unattempted)-outputData.attempted} Questions </span>
              <span>unattempted: {outputData.unattempted} </span>
              </p>}
          </div>
        </div>)
      }
      {!quizData.length>0 && <img className="loader-image" src="Circles-menu-3.gif" alt="loading"/>}
    </div>
  );
}
