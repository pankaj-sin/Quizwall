import CallIcon from '@mui/icons-material/Call';
import { Avatar, colors, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ThemeContext } from '../context/ThemeCntext';

export default function DrawerUI() {
    // state
    const { drawerSilde, setDrawerSilde } = React.useContext(ThemeContext)


    // fn
    const handleClose = () => {
        setDrawerSilde(false)
    }
    return (
        <Drawer open={drawerSilde} anchor='right' onClose={handleClose}>
            <Box sx={{ color: '#fff', bgcolor: colors.blue[800], p: 2, display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                <Avatar>DM</Avatar>
                <Typography>Demo</Typography>
                <Typography>Demo@gmail.com</Typography>
            </Box>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CallIcon />
                        </ListItemIcon>
                        <ListItemText primary='Contect Us' />
                    </ListItemButton>
                </ListItem>

            </List>
        </Drawer>
    )
}
