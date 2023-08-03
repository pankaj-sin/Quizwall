import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../../../css/screens/Mission.module.scss'
import TrendingT from '../../../assets/img/trending.png'
import Ques from '../../../assets/icon/Vector (1).png'
import Time from '../../../assets/icon/Vector (2).png'
import User from '../../../assets/icon/Vector (3).png'
import Appbar from '../../../comman/Appbar'
// import { getMissionActionBySubCat } from '../../../redux/screen/missionbysubcategory'
import { getMissionAction } from '../../../redux/screen/mission'


// import './mission.css'


export default function Mission() {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const location=useLocation()
    const sub_cat_id=location.state.sub_cat_id
    console.log("sub_cat_id==",sub_cat_id);
    const getMissionSelector = useSelector(state => state.getMission)
    const { data: missionData, loading } = getMissionSelector

    useEffect(() => {
        // dispatch(getMissionActionBySubCat({sub_cat_id:sub_cat_id}))
        dispatch(getMissionAction())
    }, [dispatch])

    return (
        <>
            <div className={styles.main_div}>
                <Appbar title='QuizWall' />

                <div className={styles.banner}>

                <img src={TrendingT} style={{ zIndex: 3 }} />

            </div>
            <div className={styles.mission_sec}>
            {missionData?.length>0?(missionData.map((item,index)=>{
                    return(
                        <div className="wrapper" key={index}>
                        <div className="continer">
                            <div className="container1">
                                <div className='image_div'>
                                    <img className="food_image" src={item?.icon} alt="" />
                                </div>
                                <div className="item_container">
                                    {console.log("item-->",item)}
                                    <div className="Cash_bonanza_div">{item?.title}</div>
                                    <div className="Fast_food_div">{item?.sub_cat_id?.sub_cat_name}</div>
                                    <div className="fast_food_detail_container">
                                        <div className="food_detils">
                                            <div><img src={Ques} /></div>
                                            <div>{item?.no_of_question}</div>
                                            <div>Q</div>
                                        </div>
                                        |
                                        <div className="food_detils">
                                            <div><img src={Time} alt="" /></div>
                                            <div>{item?.minutes}</div>
                                            <div>mins</div>
                                        </div>
                                        |
                                        <div className="food_detils">
                                            <div><img src={User} alt="" /></div>
                                            <div>{item.attempts}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="button-9" role="button" onClick={()=>{navigate('/mission-detail',{state:{mission_id:item._id}})}}>
                                Get {item.reward} Mints
                            </button>
                        </div>

                        
                    </div>
                )
                })):("No Category Available")}
                            

                            

            </div>

            </div>
            
            
        </>
    )
}
