import "./styles.css";
import React from "react";
import Quizzica from "./Quizzica";
import QuizzicaQuiz from "./QuizzicaQuiz";


export default function App() {
const [initial,setInitial]=React.useState(true);
function clickHandler(){
  setInitial(!initial);
 }
 return <div className="App">
    {initial && <Quizzica handler={clickHandler}/>}
    {!initial && <QuizzicaQuiz/>}
  </div>;
}
