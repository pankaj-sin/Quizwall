import React,{useEffect} from 'react'
import Ques from '../../../assets/icon/Vector (1).png'
import Time from '../../../assets/icon/Vector (2).png'
import User from '../../../assets/icon/Vector (3).png'
import styles from '../../../css/screens/Subcategory.module.scss'
import Appbar from '../../../comman/Appbar'
import { useNavigate,useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './missiondetails.css'
import { getMissionDetailAction } from '../../../redux/screen/missiondetails'
function QuizBox() {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const location=useLocation()
    const mission_id=location.state.mission_id;
    const missionDetail = useSelector(state => state.getMissionDetail)
    const { data: missionDetailData, loading: missionDetailLoading } = missionDetail
    console.log("missionDetailData",missionDetailData);

    useEffect(() => {
        dispatch(getMissionDetailAction(mission_id))
    }, [dispatch])
    

    return (
        <>
            <div className={styles.main_div}>
            <Appbar title='Chose one' />

                <div className='oneQuizCover'>
                    <div className="quizHeader">
                        <div className="headArea flex">
                            

                        </div>
                        <div className='quizInfo flex mt20'>
                            <div className="quizImage flex">
                                <img src={Ques} alt="food" />
                            </div>
                            <div className="quizdesc">
                                <h4 className="quizName">{missionDetailData.name}</h4>
                                <h5 className='catName'>Fast Food</h5>

                            </div>
                        </div>
                    </div>

                    <div className="oneQuizInfo">
                        <div className="pointsBox flex">
                            <div className="heroPoint">
                                <h5>15</h5>
                                <img src={Ques} width="17px" alt="ques icon" />
                            </div>
                            <div className="heroPoint">
                                <h5>15</h5>
                                <img src={Time} width="17px" alt="ques icon" />
                            </div>
                            <div className="heroPoint">
                                <h5>15</h5>
                                <img src={User} width="17px" alt="ques icon" />
                            </div>
                        </div>

                        <div className="infoPoint flex">
                            <p>Winning every round will take you into finals of this Tournament, where winning amount is waiting for you</p>
                        </div>
                        <div className="infoPoint flex">
                            <p>Winning every round will take you into finals of this Tournament, where winning amount is waiting for you</p>
                        </div>
                    </div>
                    <div className="reward oneQuizReward" onClick={() => navigate(`/mission-qna`,{state:{mission_id:missionDetailData?._id}})}><p>Get 200 Mints</p></div>
                </div>
            </div>
        </>
    )
}

export default QuizBox