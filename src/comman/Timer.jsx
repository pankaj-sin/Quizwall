import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { PropTypes } from "prop-types";
// import { useDispatch } from 'react-redux';
// import { getSurveyAction } from '../redux/user/survey/getSurvey';

export default function Timer({ surveyActivationTimeMin, timerToOpen }) {


    // console.log("getSurveyOpningTimerData", surveyActivationTimeMin)

    // state 
    // const dispatch = useDispatch()
    const [days, setDays] = useState('0');
    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState('0');
    const [seconds, setSeconds] = useState('0');

    var nowDate = new Date();
    nowDate.setMinutes(nowDate.getMinutes() + surveyActivationTimeMin);
    nowDate = localStorage.getItem('pwa_timer') ? localStorage.getItem('pwa_timer') : new Date(nowDate)

    // console.log("nowDate", nowDate)


    const getTime = () => {
        const time = Date.parse(nowDate) - Date.now();
        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };


    useEffect(() => {

        if (timerToOpen) {
            if (days != 0 || hours != 0 || minutes != 0 || seconds != 0) {
                const interval = setInterval(() => {
                    getTime(nowDate)
                    window.localStorage.setItem('pwa_timer', nowDate)

                }, 1000);
                return () => clearInterval(interval);
            }
            // else {
            //     const interval = setTimeout(() => {
            //         dispatch(getSurveyAction())
            //     }, 2000)
            //     return () => clearInterval(interval);
            // }

        }
    }, [days, hours, minutes, seconds]);

    return (
        <div className="timer" role="timer">
            <Typography variant='p'>{days < 10 ? "0" + days : days} : {hours < 10 ? "0" + hours : hours} : {minutes < 10 ? "0" + minutes : minutes} : {seconds < 10 ? "0" + seconds : seconds}
            </Typography>
        </div>
    )
}


Timer.propTypes = {
    surveyActivationTimeMin: PropTypes.any,
    timerToOpen: PropTypes.any,
};