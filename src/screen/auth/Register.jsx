import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import Logo from "../../assets/img/Logo.png";
import SaveMoney from "../../assets/img/saveMoney.webp";
import SnackBarUI from '../../comman/SnackBarUI';
import { registerAction } from '../../redux/auth/register';


const registerSchema = yup.object({
    name: yup.string().required('Name is required.'),
    email: yup.string().required('Email is required.'),
    publisher_name: yup.string().required('Publisher name is required.'),
}).required();

export default function Register() {
    // state
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });

    const registerSelector = useSelector(state => state.register)
    const { status, message } = registerSelector

    const [snack, setSnack] = useState(false)

    // fn
    const handleRegister = async (data) => {

        const registerData = await dispatch(registerAction(data))
        if (registerData?.payload?.status == 200) {
            localStorage.setItem('pwa_user_id', JSON.stringify(registerData?.payload?.data?._id))
            localStorage.setItem('pwa_publisher_id', JSON.stringify(registerData?.payload?.data?.publisher_id?._id))
            localStorage.setItem('pwa_token', JSON.stringify(registerData?.payload?.token))
            navigate("/survey")
            setSnack(true)
            reset()
        }
        setSnack(true)
    }


    return (
        <>
            <Stack alignItems={'center'} sx={{ p: 2 }} justifyContent={'center'}>
                <img src={Logo} width={'15%'} />
                <form onSubmit={handleSubmit(handleRegister)}>
                    <Stack alignItems={'center'} sx={{ p: 2, height: '100vh' }} justifyContent={'center'} spacing={2}>
                        <img src={SaveMoney} width={'100%'} />
                        <Typography variant='h4'>Hello Welcome!</Typography>
                        <Typography variant='subtitle1'>Best place to earn daily rewads by playing quick sruvey. </Typography>
                        <TextField label="Name" fullWidth {...register('name')} variant="outlined" error={errors?.name?.message} helperText={errors?.name?.message} />
                        <TextField type='email' label="Email" fullWidth {...register('email')} variant="outlined" error={errors?.email?.message} helperText={errors?.email?.message} />
                        <TextField label="Publisher" fullWidth {...register('publisher_name')} variant="outlined" error={errors?.publisher_name?.message} helperText={errors?.publisher_name?.message} />
                        <Button type='submit' size='large' fullWidth variant='contained' color='primary'>Register</Button>
                        <Link to='/'>
                            <Typography variant='subtitle1'>
                                Already have account ?
                            </Typography>
                        </Link>
                    </Stack>
                </form>
            </Stack>
            <SnackBarUI state={snack} setState={setSnack} status={status} message={message} />
            <SnackBarUI state={snack} setState={setSnack} status={status} message={message} />
        </>
    )
}