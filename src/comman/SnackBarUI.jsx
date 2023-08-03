import React from 'react'
import { Alert, Snackbar } from '@mui/material'
import PropTypes from 'prop-types';

export default function SnackBarUI({ state, setState, message, status, snackActiveTime, messageHtml }) {

    // fun
    const closeSnackFunc = () => {
        setState(false)
    }

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center', }} open={state} autoHideDuration={snackActiveTime || 3000} onClose={closeSnackFunc}>
            <Alert onClose={closeSnackFunc} severity={status == 201 || status == 200 ? "success" : "error"} sx={{ width: '100%' }}>
                {messageHtml ? messageHtml : message}

            </Alert>
        </Snackbar>
    )
}


SnackBarUI.propTypes = {
    state: PropTypes.any,
    setState: PropTypes.any,
    message: PropTypes.any,
    status: PropTypes.any,
    snackActiveTime: PropTypes.any,
    messageHtml: PropTypes.any,
};