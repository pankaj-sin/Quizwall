import React, { useEffect } from 'react'
import styles from '../../../css/screens/Home.module.scss'
import CatImg from '../../../assets/img/categories.png'
import Car from '../../../assets/img/car.png'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material';
import { getCategoryAction } from '../../../redux/screen/category';
import { useNavigate } from 'react-router-dom'





function Category() {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const category = useSelector(state => state.getCategory)
    const { data: CategoryData, loading: CategoryLoading } = category

    console.log("CategoryData-->",CategoryData)

    useEffect(()=>{
        dispatch(getCategoryAction())
    },[dispatch])

    return (
        <>
            <div className={styles.banner}>

                {/* <img className={styles.banner_img_top} src={CatImgT} /> */}
                <img src={CatImg} />

            </div>
            <div className={styles.categories_sec}>
                
                {CategoryData?.length>0?(CategoryData.map((item,index)=>{
                    return(
                    <div className={styles.categorie} key={index}>
                    <div>
                        <div className={styles.categorie_img}>
                            <img src={item.image} width="50px" alt="img" />
                        </div>
                    </div>
                    <div>
                        <Typography>
                            {item.cat_name}
                        </Typography>
                    </div>
                    <div>
                        <Button variant="outlined" onClick={()=>{navigate('/sub-category',{ state: { cat_id: item._id } })}}>
                            View
                        </Button>
                    </div>

                </div>)
                })):("No Category Available")}
                
            </div>
        </>
    )
}

export default Category