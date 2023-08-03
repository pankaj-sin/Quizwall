import { Card, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import Appbar from '../../comman/Appbar'
import DrawerUI from '../../comman/DrawerUI'


export default function Account() {


    return (
        <>
            <Appbar />
            <DrawerUI />
            <Card sx={{ m: 2, p: 2 }} className='card'>
                <Typography variant='h5'>User Account</Typography>
                <Stack sx={{ mt: 2 }}>
                    <Typography variant='subtitle1'>Reward earned</Typography>
                    <Typography variant='h5'>00</Typography>
                </Stack>
                <Stack sx={{ mt: 2 }}>
                    <Typography variant='subtitle1'>survey Completed</Typography>
                    <Typography variant='h5'>00</Typography>
                </Stack>
                <Stack sx={{ mt: 2 }}>
                    <Typography variant='subtitle1'>survey pending</Typography>
                    <Typography variant='h5'>00</Typography>
                </Stack>
            </Card>
        </>
    )
}
