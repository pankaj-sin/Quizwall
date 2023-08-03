import { createTheme } from '@mui/material';


export const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: `'Be Vietnam Pro', sans-serif`
        },
    },
    palette: {
        primary: {
            main: "#071D45",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 28,
                },
            },
        },
    },
});

