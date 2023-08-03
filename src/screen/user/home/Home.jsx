import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom'
import Appbar from '../../../comman/Appbar'
import { useDispatch, useSelector } from 'react-redux'
// import DrawerUI from '../../../comman/DrawerUI'
// import History from '../../history/History'
// import SurveyData from './SurveyData'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CarouselImg from '../../../assets/img/image1.png'
import styles from '../../../css/screens/Home.module.scss'
import { getBannerAction } from '../../../redux/screen/banner';
import Category from './category';
import Trending from './trending';


export default function Home() {
    // state
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const banner = useSelector(state => state.getBanner)
    const { data: bannerData, loading: bannerLoading } = banner


    const { pathname } = useLocation()

    const [activeTab, setActiveTab] = useState('survey');

    const carouselStyle = {
        padding: '20px',
        background: "7px solid red"
    }
    const carouselArray = [CarouselImg, CarouselImg, CarouselImg]
    // use effect
    // useEffect(() => {
    //     if (pathname.includes("/survey")) {
    //         history.pushState(null, null, location.href);
    //         window.onpopstate = function () {
    //             history.go(1);
    //         };
    //     }
    // }, [])

    useEffect(() => {
        dispatch(getBannerAction())
    }, [dispatch])

    return (
        <>
            <div className={styles.main_div}>
                <Appbar title='QuizWall' />
                {/* <DrawerUI /> */}
                <div style={carouselStyle} >
                    <Carousel showThumbs={false} autoPlay={true} interval={3000} infiniteLoop>

                        {bannerData.map((item, index) => (
                            <div key={index}>
                                <img src={item.image} alt="img" />
                            </div>
                        ))}

                        {/* <div>
                        <img src={CarouselImg} />
                    </div>
                    <div>
                        <img src={CarouselImg} />
                    </div>
                    <div>
                        <img src={CarouselImg} />
                    </div> */}
                    </Carousel>
                </div>

                <div>
                    <Category />
                    <Trending/>
                </div>
            </div>


        </>
    )
}