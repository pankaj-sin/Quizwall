import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import Routes from './routes'
import { theme } from './theme/Theme'
import { ThemeProvider } from '@mui/material';
import { ThemeCntext } from './context/ThemeCntext'



export default function App() {
  return (

    <ThemeProvider theme={theme}>
      <ThemeCntext>
        <Provider store={store}>
          <Routes />
        </Provider >
      </ThemeCntext>
    </ThemeProvider>

  )
}
