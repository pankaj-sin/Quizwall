import "./LayoutComp.css";
import ProgressBar from "./progressBar";
import ImaegeComp from "./ImageComp";
import VideoComp from "./VideoComp";
import RaidoComp from "./RadioComp";
import CompCheck from "./CompCheck";
import Timer from "./Timer";
import React, {useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { submitAction } from "../../../redux/screen/submit";

function LayoutComp({
  _id,
  question,
  video,
  indexValue,
  length,
  image,
  next,
  instruction,
  answer_type,
  ans_options,
  submitAnswer,
  mission_id,
  setSubmitAnswer,
  correctAnswer,
  setCorrectAnswer
}) {
const dispatch=useDispatch()
console.log("_id-->",_id)
console.log("answer_type-->",answer_type)
const [options,setOptions]=useState([])
const [second, setSecond] = useState(false);
const [flag,setFlag] = useState(true)
  
  function getRadioData(rdata) {
  }
 
  function getCheckBoxesData(cdata) {
    if(cdata.food){
    setFlag(true)
  }}
  // const ChildRef = useRef();

  function nextClickHandler() {
    console.log("options-->",options);
    console.log("ans_options-->",ans_options)
    let matched;
    if(answer_type=='MCQ'){
        matched = options.every(option =>
            ans_options.some(item => item.option === option && item.correct === true)
          );
          
          console.log("MCQ matched==>",matched);
    }else{
        console.log("optional-->",options);
        console.log("optional ans_options-->",ans_options);
        matched = ans_options.some(item => item.option === options && item.correct === true);

console.log("optional matched-->",matched);

    }
    if(matched){
        setCorrectAnswer(correctAnswer+1)
    }
    
    submitAnswer.push({_id:_id,option:options})
    next();
    setSecond(true);
    // console.log(second);
    setOptions([])
    console.log("after submitAnswer.push-->",submitAnswer)
    // ChildRef.current.setTime(30)
  }

  function submitHandler(){
    submitAnswer.push({_id:_id,option:options})
    console.log("submitAnswer",submitAnswer);
    let matched;
    if(answer_type=='MCQ'){
        matched = options.every(option =>
            ans_options.some(item => item.option === option && item.correct === true)
          );
          
          console.log("MCQ matched==>",matched);
    }else{
        console.log("optional-->",options);
        console.log("optional ans_options-->",ans_options);
        matched = ans_options.some(item => item.option === options && item.correct === true);

console.log("optional matched-->",matched);

    }
    if(matched){
        setCorrectAnswer(correctAnswer+1)
    }
    console.log("correctAnswer",correctAnswer);
    console.log("mission_id:",_id,submitAnswer);
    dispatch(submitAction({"mission_id":mission_id,"correctAnswer":correctAnswer}))
  }

  return (
    <div className="wrapper">
      <div className="cszbo">Cash Bonanza</div>
      <hr></hr>
      <div className="container_layout">
        <div className="quesind-timer">
          <div className="que-indicator">
            <div className="indicator-color"> Question 0{indexValue + 1}</div>{" "}
            <div className="divide-totalno-ques">/0{length}</div>
          </div>

          <Timer
            next={next}
            length={length}
            indexValue={indexValue}
            second={second}
          />
        </div>
        {<ProgressBar colorpercent={((indexValue + 1) * 100) / length} />}
        <div className="">{instruction}</div>
        <div className="question">{question}</div>
        {image ? (
          <ImaegeComp image={image} />
        ) : video ? (
          <VideoComp video={video} />
        ) : (
          ""
        )}

        <div>Choose all the correct answers: </div>
        {answer_type=='optional' ? (
          <RaidoComp getRadioData={ans_options} options={options} setOptions={setOptions}/>
        ) : (
          <CompCheck getCheckBoxesData={ans_options} options={options} setOptions={setOptions}/>
        )}

        {
         flag && (length - 1 > indexValue ? (
            <div className="pink-button" onClick={nextClickHandler}>
              next
            </div>
          ) : (
            <div className="pink-button" onClick={()=>{submitHandler()}}>submit</div>
          ))}
      </div>
    </div>
  );
}

export default LayoutComp;
