import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types';

const ThemeContext = createContext(false)

const ThemeCntext = ({ children }) => {
    const [drawerSilde, setDrawerSilde] = useState(false)

    // toogle drawer
    const toggleDrawerFun = () => {
        setDrawerSilde(!drawerSilde)
    }



    return (
        <ThemeContext.Provider value={{
            // state
            drawerSilde: drawerSilde,
            setDrawerSilde: setDrawerSilde,
            toggleDrawerFun: toggleDrawerFun
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeCntext }


ThemeCntext.propTypes = {
    children: PropTypes.any,
};