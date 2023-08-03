import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';

export default function LocationBackDrop({ state }) {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={state} >
            <CircularProgress color="inherit" />
        </Backdrop >
    )
}
LocationBackDrop.propTypes = {
    state: PropTypes.any,
};