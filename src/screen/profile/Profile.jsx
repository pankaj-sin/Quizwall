import { Autocomplete, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Appbar from '../../comman/Appbar'
import DrawerUI from '../../comman/DrawerUI'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addProfileDetailsAction } from '../../redux/profile/addProfileDetails'
import SnackBarUI from '../../comman/SnackBarUI'
import { getUserDetailsAction } from '../../redux/user/getUserDetails'
import LoadingUI from '../../comman/LoadingUI'



const profileDetailsScehma = yup.object({
    gender: yup.string().required('Gender is required'),
    age: yup.string().required('Age is required'),
    materal_status: yup.string().required('Material status is required'),
    employment_status: yup.string().required('Employment status is required'),
    houshold_encome: yup.string().required('Household encome is required'),
    family_member: yup.string().required('Family member is required'),
}).required();


const ageRange = [
    "less than 18",
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "above 64"
]


const familyMemberRange = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "more than 10",
]

const householdEncomeRange = [
    "upto ₹120000",
    "₹120000-₹250000",
    "₹400000-₹600000",
    "₹600000-₹1000000",
    "₹1000000-₹2500000",
    "₹2500000-₹5000000",
    "more than ₹5000000",
]


export default function Profile() {
    // state
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addProfileDetailsSelector = useSelector(state => state.addProfileDetails)
    const { status, message } = addProfileDetailsSelector

    const getUserDetailsSelector = useSelector(state => state.getUserDetails)
    const { data, loading } = getUserDetailsSelector

    const { register, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(profileDetailsScehma), defaultValues: {} });

    const [snack, setSnack] = useState(false)


    // fn
    const handleProfile = async (data) => {
        let profileDetails = await dispatch(addProfileDetailsAction(data))
        if (profileDetails?.payload?.status == 200) {
            setSnack(true)
            navigate("/survey")
        }
    }

    // useEffect
    useEffect(() => {
        dispatch(getUserDetailsAction())
    }, [])

    useEffect(() => {
        let defaultValues = {}
        defaultValues.gender = data?.gender
        defaultValues.age = data?.age
        defaultValues.materal_status = data?.materal_status
        defaultValues.employment_status = data?.employment_status
        defaultValues.houshold_encome = data?.houshold_encome
        defaultValues.family_member = data?.family_member
        reset(defaultValues)
    }, [])



    return (
        <>
            <Appbar title='Profile' />
            <DrawerUI />

            {/* gender */}
            <form onSubmit={handleSubmit(handleProfile)}>
                {loading
                    ? <LoadingUI />
                    :
                    <>
                        <Stack sx={{ p: 2 }} spacing={2}>
                            <FormControl>
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup defaultValue={data?.gender}>
                                    <Stack direction={'row'} spacing={1}>
                                        <FormControlLabel {...register('gender')} value="Female" control={<Radio />} label="Female" />
                                        <FormControlLabel {...register('gender')} value="Male" control={<Radio />} label="Male" />
                                        <FormControlLabel {...register('gender')} value="Other" control={<Radio />} label="Other" />
                                    </Stack>
                                </RadioGroup>
                                <FormHelperText error={errors?.gender?.message}>{errors?.gender?.message}</FormHelperText>
                            </FormControl>

                            {/* <TextField defaultValue={data?.age} {...register('age')} helperText={errors?.age?.message} error={errors?.age?.message} label='Age' type="Number" /> */}

                            <Autocomplete defaultValue={data?.age} options={ageRange} renderInput={(params) => <TextField {...register('age')} helperText={errors?.age?.message} error={errors?.age?.message} label='Age'  {...params} />} />


                            {/* material status */}
                            <FormControl>
                                <FormLabel>Marital Status</FormLabel>
                                <RadioGroup defaultValue={data?.materal_status}>
                                    <Stack direction={'row'} spacing={1}>
                                        <FormControlLabel {...register('materal_status')} value="Married" control={<Radio />} label="Married" />
                                        <FormControlLabel {...register('materal_status')} value="Unmarried" control={<Radio />} label="Unmarried" />
                                    </Stack>
                                </RadioGroup>
                                <FormHelperText error={errors?.materal_status?.message}>{errors?.materal_status?.message}</FormHelperText>
                            </FormControl>



                            {/* employment status */}
                            <FormControl>
                                <FormLabel>Employment Status</FormLabel>
                                <RadioGroup defaultValue={data?.employment_status}>
                                    <Stack direction={'row'} spacing={1}>
                                        <FormControlLabel {...register('employment_status')} value="Employed" control={<Radio />} label="Employed" />
                                        <FormControlLabel {...register('employment_status')} value="Unemployed" control={<Radio />} label="Unemployed" />
                                    </Stack>
                                </RadioGroup>
                                <FormHelperText error={errors?.employment_status?.message}>{errors?.employment_status?.message}</FormHelperText>
                            </FormControl>


                            {/* <TextField defaultValue={data?.houshold_encome} {...register('houshold_encome')} helperText={errors?.houshold_encome?.message} error={errors?.houshold_encome?.message} label='Housedhold Encome' type="Number" /> */}
                            <Autocomplete defaultValue={data?.houshold_encome} options={householdEncomeRange} renderInput={(params) => <TextField {...register('houshold_encome')} helperText={errors?.houshold_encome?.message} error={errors?.houshold_encome?.message} label='Housedhold Income'  {...params} />} />

                            {/* <TextField defaultValue={data?.family_member}  {...register('family_member')} helperText={errors?.family_member?.message} error={errors?.family_member?.message} label='Family Members' type="Number" /> */}
                            <Autocomplete defaultValue={data?.family_member} options={familyMemberRange} renderInput={(params) => <TextField {...register('family_member')} helperText={errors?.family_member?.message} error={errors?.family_member?.message} label='Family Members'  {...params} />} />

                            <Stack direction={'row'} spacing={2}>
                                <Button type='submit' variant='contained'>Add Profile Details</Button>
                                {/* <Button onClick={() => navigate("/survey")} variant='contained' color='error'>Back to home</Button> */}
                            </Stack>
                        </Stack>
                    </>}
            </form>



            <SnackBarUI state={snack} setState={setSnack} status={status} message={message} />
        </>
    )
}
