import React, { useEffect, useState } from 'react'
import timeBack from "../../../assets/icon/timeBack.png"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,useLocation} from 'react-router-dom'
// import rect from "../../images/rect.png"
import './qna.css'
import data from './data'
import LayoutComp from './LayoutComp'
import { getQnaAction } from '../../../redux/screen/getqna'

function Qna() {
    
    const dispatch=useDispatch()
    const [count, setCount] = useState(3);
    const [updateCount, setUpdateCount] = useState(3);
    const [data,setData]=useState([])
    const [timeScreen, setTimeScreen] = useState(true);
    const [submitAnswer,setSubmitAnswer]=useState([])
    const [correctAnswer,setCorrectAnswer]=useState(0)

    const [warning, setWarning] = useState(true)
    const location = useLocation()
    console.log("mission_id-->",location.state.mission_id);
    const mission_id = location.state.mission_id

    const getQna = useSelector(state => state.getQna)
    const { data: qnaData, loading: qnaLoading } = getQna
    console.log("qnaData-->",qnaData.link_qns);
    

    const next = () =>{
        setCount(count+1);
        
      }

    useEffect(()=>{
        setData(qnaData.link_qns)
    },[qnaData])

    useEffect(()=>{
        dispatch(getQnaAction({"mission_id":mission_id, "user_id":"64631711fe7c2efc6fd662d8",
        "publisher_id":"645a28e6efcc6ab5713a7b7c"}))
    },[dispatch])


    useEffect(() => {
        function updateProgressBar() {

            let progressBar = document.querySelector(".circular-progress");
            let valueContainer = document.querySelector(".value-container");

            let progressValue = 90;
            let progressEndValue = 0;
            let speed = 10;

            let progress = setInterval(() => {
                progressValue--;
                valueContainer.textContent = count >= 1 ? count : "Go";
                progressBar.style.background = `conic-gradient(
              #4d5bf9 ${progressValue * 3.6}deg,
              #cadcff ${progressValue * 3.6}deg
            )`;
                if (progressValue == progressEndValue) {
                    if (updateCount >= 1) {

                        setUpdateCount(updateCount - 1)
                        setCount(count - 1)
                    } else {
                        setTimeScreen(false)
                    }
                    clearInterval(progress);
                    return;
                }
            }, speed);
        }


        updateProgressBar();
    }, [updateCount]);


    

    return (
        <>
            {
                timeScreen ? (
                <div className='main'>
                    <div className="container">
                        <div className="circular-progress">
                            <div className="value-container"></div>
                        </div>
                    </div>
                </div>

                )
                    : (

                        
                        <LayoutComp
                            key={data[count]._id}
                            {...data[count]}
                            indexValue={count}
                            length={data.length}
                            next={next}
                            answer_type={data[count].answer_type}
                            ans_options={data[count].options}
                            submitAnswer={submitAnswer}
                            setSubmitAnswer={setSubmitAnswer}
                            mission_id={mission_id}
                            correctAnswer={correctAnswer}
                            setCorrectAnswer={setCorrectAnswer}
                            // ques_id={data[count]}
                        />
                        
                    )
            }


        </>
    )
}

export default Qna