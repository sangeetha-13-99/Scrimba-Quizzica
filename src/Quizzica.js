export default function Quizzica(props){
return (
  <div className="start-page">
    <h3>Quizzica</h3>
    <p> It's a quiz App</p>
    <button onClick={props.handler}>start Quiz</button>
  </div>
)
}