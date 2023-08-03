import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../../css/screens/Home.module.scss'
import CatImg from '../../../assets/img/categories.png'
// import CatImgT from '../../../assets/img/categoriesT.png'
import TrendingT from '../../../assets/img/trending.png'
import Car from '../../../assets/img/car.png'
import Ques from '../../../assets/icon/Vector (1).png'
import Time from '../../../assets/icon/Vector (2).png'
import User from '../../../assets/icon/Vector (3).png'
import { Button, Typography } from '@mui/material';
import { getMissionAction } from '../../../redux/screen/mission';
import './trending.css'

function Trending() {
    const dispatch = useDispatch()
    const getMissionSelector = useSelector(state => state.getMission)
    const { data: missionData, loading } = getMissionSelector

    useEffect(() => {
        dispatch(getMissionAction())
    }, [dispatch])

    return (
        <>
            <div className={styles.banner}>

                {/* <img className={styles.banner_img_top} src={TrendingT} /> */}
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
                            <button className="button-9" role="button">
                                Get {item.reward} Mints
                            </button>
                        </div>

                        
                    </div>
                )
                })):("No Category Available")}
                            

                            

            </div>
            
        </>
    )
}

export default Trending