import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
// import LogoutIcon from '@mui/icons-material/Logout';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PolicyIcon from '@mui/icons-material/Policy';
import { Card, Divider, Grid, IconButton, Menu, MenuItem, Stack, Typography, } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { PropTypes } from "prop-types";
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Arrow from '../assets/icon/Vector.png'

export default function Appbar({ title }) {
    // state
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = anchorEl;
    const navigate = useNavigate()
    const { pathname } = useLocation();

    console.log("pathname", pathname)

    const userDetialsSelector = useSelector(state => state.getUserDetails)
    const { data } = userDetialsSelector

    // fn
    const handleProfileMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    // const handleLogout = () => {
    //     localStorage.removeItem('pwa_user_id')
    //     localStorage.removeItem('pwa_publisher_id')
    //     localStorage.removeItem('pwa_token')
    // }



    return (
        <AppBar position="sticky" sx={{ height: 98,width:"100vw", bgcolor: '#fff', display: 'flex', justifyContent: 'end'}}>
            <Stack direction="row" sx={{margin:"0px 0px 15px 15px"}}>
                <img style={{marginTop:"8px"}} width="15px" height="15px" src={Arrow} alt="arrow" onClick={()=>{navigate(-1)}}/>
                <Typography sx={{fontFamily: "'Gantari', sans-serif",fontStyle:"normal",fontSize:"20px",color:"#2C2C2C",marginLeft:"20px"}}>{title}</Typography>
            </Stack>
        </AppBar >
    )
}


Appbar.propTypes = {
    title: PropTypes.string,
};