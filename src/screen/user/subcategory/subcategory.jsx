import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom'
import Appbar from '../../../comman/Appbar'
import { useDispatch, useSelector } from 'react-redux'
import Arrow from '../../../assets/icon/Arrow.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CarouselImg from '../../../assets/img/image1.png'
import Food from '../../../assets/img/food.png'
import styles from '../../../css/screens/Subcategory.module.scss'
import { getBannerAction } from '../../../redux/screen/banner';
import { getSubCategoryAction } from '../../../redux/screen/subcategory';



export default function Subcategory() {
    // state
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.state.cat_id);
    const sub_id = location.state.cat_id
    const dispatch = useDispatch()
    const subcategory = useSelector(state => state.getSubcategory)
    const { data: subcategoryData, loading: subcategoryLoading } = subcategory


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
        console.log("useEffect-->", location.state.cat_id);
        dispatch(getSubCategoryAction(sub_id))
    }, [dispatch])

    return (

        <>
            <div className={styles.main_div}>

                <Appbar title='Chose one' />

                <div className={styles.banner}>

                    {/* <img className={styles.banner_img_top} src={CatImgT} /> */}
                    <img src={Food} />

                </div>
                <div className={styles.categories_sec}>
                    {console.log("subcategoryData",subcategoryData.length)}
                    {subcategoryData?.length > 0 ? (subcategoryData.map((item, index) => {
                        return (
                            <div key={index} className={styles.categorie} onClick={() => { navigate('/missions',{ state: { sub_cat_id: item._id } }) }}>
                                <div className={styles.heading}>
                                    {item.sub_cat_name}
                                </div>

                                <div className={styles.link}>
                                    view Quizzes &nbsp;
                                    <span><img src={Arrow} alt='arrow' /></span>
                                </div>

                            </div>




                        )

                    })) : ("Loading....")}

                </div>

            </div>
        </>
    )
}