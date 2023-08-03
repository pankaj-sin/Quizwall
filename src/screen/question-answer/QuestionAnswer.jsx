import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Appbar from '../../comman/Appbar';
import City from '../../comman/city';
import DrawerUI from '../../comman/DrawerUI';
import LoadingUI from '../../comman/LoadingUI';
import Style from "../../css/screens/QuestionAnswer.module.scss";
import { completeSurveyAction } from '../../redux/user/completeSurvey';
import { getUserDetailsAction } from '../../redux/user/getUserDetails';
import { getQnsAnsAction } from '../../redux/user/qns-ans/getQnsAns';
import { qnsCountAction } from '../../redux/user/qns-ans/questionCount';
import { submitQnsAnsAction } from '../../redux/user/qns-ans/submitQnsAns';
import { userRewardToGpAction } from '../../redux/user/userRwardToGP';

let correct_answer = true

export default function QuestionAnswer() {

    // states------->
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let page = JSON.parse(localStorage.getItem('pwa_pg')) || 0

    let location = useLocation()
    const { search } = location
    const query = new URLSearchParams(search);



    let survey_id = query.get("survey_id")
    const getQnsAns = useSelector(state => state.getQnsAns)
    const { data: getQnsAnsData, loading: getQnsAnsLoading } = getQnsAns
    const qnsCount = useSelector(state => state.qnsCount)
    const { data: qnsCountData } = qnsCount
    const completeSurvey = useSelector(state => state.completeSurvey)
    const { loading: completeSurveyLoading } = completeSurvey
    const appUses = useSelector(state => state.appUsesData)
    const { data: appUsesData } = appUses
    const getUserDetails = useSelector(state => state.getUserDetails)
    const { data: getUserDetailsData, } = getUserDetails


    const [answer, setAnswer] = useState('')
    const setAnswerMCQ = useState([])[1]
    const [MCQChecked, setMCQChecked] = useState({})
    const [locationQnsAns, setLocationQnsAns] = useState(null);




    // fn
    const submitAndnextQnsFunc = async () => {
        page += 1
        localStorage.setItem("pwa_pg", JSON.stringify(page))
        if (locationQnsAns != null) {
            if (getUserDetailsData?.city !== locationQnsAns) {
                correct_answer = false
            }
        }

        await dispatch(submitQnsAnsAction({
            survey_id: survey_id,
            qns_id: getQnsAnsData?.link_qns?.[0]?._id,
            answer: answer ? answer : JSON.stringify(MCQChecked),
            question_reletive_cat: getQnsAnsData?.link_qns?.[0]?.question_reletive_cat,
            correct_answer: correct_answer
        }))
        await dispatch(getQnsAnsAction({ limit: 1, page: page, survey_id: survey_id }))

        if (page === qnsCountData) {
            let completeSurvey = await dispatch(completeSurveyAction({ survey_id: survey_id }))
            if (completeSurvey?.payload?.status == 200) {
                await dispatch(userRewardToGpAction({ survey_id: survey_id }))
                localStorage.removeItem("pwa_pg")
            }
            navigate(`/feedback/${survey_id}`)
        }
        setAnswer('')
        setAnswerMCQ([])
        setMCQChecked({})
    }


    useEffect(() => {
        dispatch(getQnsAnsAction({ limit: 1, page: page, survey_id: survey_id }))
        dispatch(qnsCountAction(survey_id))
        dispatch(getUserDetailsAction())
    }, [dispatch])



    // stop going back in page
    const handledisablegoingback = () => {
        window.history.pushState(null, document.title, window.location.href);
    }
    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', handledisablegoingback);

        return () => removeEventListener('popstate', handledisablegoingback)
    }, [])


    return (
        <>

            <Appbar title='Q & A' />
            <DrawerUI />
            {getQnsAnsLoading || completeSurveyLoading
                ? <LoadingUI height='100%' />
                : getQnsAnsData?.link_qns?.map((items, index) => {
                    return (
                        <Box key={index} sx={{ m: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '70vh' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: 14 }} variant='subtitle2' color='error'>Please do not refresh the page, otherwise you may lose your reward !</Typography>
                                <Typography sx={{ mt: 2 }} variant='h6' color='primary'>{items?.question}</Typography>
                                {items?.question_type != "default" && <Typography variant='subtitle2'>Select one option</Typography>}

                                {/* single selection */}
                                {(items?.answer_type == "optional" || items?.answer_type == "conditional") ?
                                    <FormControl >
                                        <RadioGroup >
                                            {items?.ans_options?.map((data, index) => {
                                                return (
                                                    <FormControlLabel className={Style.radio} key={index}
                                                        value={data} control={<Radio />} label={data} onChange={(event) => { setAnswer(event.target.value) }} />
                                                )
                                            })}
                                        </RadioGroup>
                                    </FormControl>
                                    : null}




                                {/* multiple choise */}
                                {(items?.answer_type == "MCQ") ?
                                    <FormControl >
                                        <FormGroup>
                                            {items?.ans_options?.map((data, index) => {
                                                return (
                                                    <FormControlLabel key={index}
                                                        className={Style.checkbox}
                                                        checked={MCQChecked[index]}
                                                        onChange={(event) => {

                                                            if (event.target.checked) {
                                                                setMCQChecked({ ...MCQChecked, [index]: event.target.name })
                                                            } else {
                                                                delete MCQChecked[index];
                                                            }
                                                            setAnswerMCQ([])

                                                        }}
                                                        name={data}
                                                        label={data}
                                                        control={<Checkbox />}
                                                    />
                                                )
                                            })}
                                        </FormGroup>
                                    </FormControl>
                                    : null}


                                {/* default qns */}
                                {items?.question_reletive_cat == 'Location' ?

                                    <Autocomplete fullWidth
                                        disablePortal
                                        // id={getCatData?._id}
                                        options={City}
                                        // getOptionLabel={getCatData => getCatData?.cat_name}
                                        onChange={
                                            (e, newVal) => {
                                                setAnswer(newVal)
                                                setLocationQnsAns(newVal)
                                            }
                                        }
                                        renderInput={(params) =>
                                            <TextField  {...params} label="Location" value={answer} />}
                                    />

                                    : null}

                                {items?.question_reletive_cat == 'app_uses' ?

                                    <Autocomplete open sx={{ my: 4 }} disablePortal id={appUsesData?._id} options={appUsesData} getOptionLabel={appUsesData => appUsesData}
                                        onChange={
                                            (e, newVal) => setAnswer(newVal)
                                        }
                                        renderInput={(params) =>
                                            <TextField {...params} label="App Uses" value={answer} />}
                                    />
                                    : null}
                            </Box>

                            <Button disabled={answer == "" && !Object?.keys(MCQChecked)?.length} size='large' sx={{ mt: 5, p: 1.5 }} fullWidth variant='contained' onClick={submitAndnextQnsFunc}>Submit</Button>
                        </Box>
                    )
                })
            }

        </>
    )
}

