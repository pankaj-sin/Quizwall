import { Box, Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userSaveCallbackAction } from '../../redux/question-anwer/userSaveCallbackRTK'

export default function TremsAndCondition() {
    // state-------->

    const dispatch = useDispatch()
    const getQuestionAnswerSelector = useSelector(state => state.getQuestionAnswer)
    const { data, loading } = getQuestionAnswerSelector

    // function-------->
    const handleAccept = () => {
    }


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw', height: '100vh', alignItems: 'center' }}>
            <Box sx={{ p: 4, width: 600 }}>
                <Typography variant='h4' sx={{ mb: 2 }}>Terms of Serivce</Typography>
                <Box sx={{ height: 400, overflow: 'scroll' }}>
                    <Typography sx={{ mt: 2 }} variant='h6'>
                        These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and
                        website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
                        You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                    </Typography>
                </Box>
                <Link to='/survey' style={{ textDecoration: 'none' }}>
                    <Button fullWidth sx={{ p: 2, my: 3 }} variant='contained' onClick={handleAccept}>Accept</Button>
                </Link>
            </Box>
        </Box>
    )
}
