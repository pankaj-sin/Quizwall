import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
    const isAuthenticatedPublisherId = JSON.parse(localStorage.getItem("pwa_publisher_id"));
    const platform = JSON.parse(localStorage.getItem("pwa_platfrom"));
    const token = JSON.parse(localStorage.getItem("pwa_token"));


    // console.log("protect route > isAuthenticatedPublisherId ", isAuthenticatedPublisherId)
    // console.log("protect route > token ", token)


    return isAuthenticatedPublisherId && token && platform ? children : <Navigate to={`/`} />

}

export default ProtectedRoute;


ProtectedRoute.propTypes = {
    children: PropTypes.any,
};