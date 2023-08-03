import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import notFound from "../assets/img/notfound.webp";

export default function NotFound() {
    // state 
    const navigate = useNavigate()
    return (
        <Box sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Stack spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '100%', }}>
                    <Box sx={{ my: 3 }}>
                        <img src={notFound} alt='info' width='100%' />
                        <Typography variant='h4' align='center'>NOT FOUND</Typography>
                    </Box>
                    <Typography variant='p' align='center'>Sorry We Don not have what you are looking for.</Typography>
                </Box>
                <Button sx={{ mt: 3 }} size='large' variant='contained' fullWidth onClick={() => navigate("/survey")}> <KeyboardBackspaceIcon />back to home</Button>
            </Stack>
        </Box >
    )
}
