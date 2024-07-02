import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import {MenuButton} from "./MenuButton";
import {useTheme} from "@mui/material";

type Props = {
    changeModeHandler: () => void
}
export default function ButtonAppBar({changeModeHandler}: Props) {
    const theme = useTheme()
    return (
        <Box sx={{ flexGrow: 1, marginBottom: '80px' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <MenuButton color="inherit" background={theme.palette.primary.main}>Login</MenuButton>
                    <MenuButton color="inherit">Logout</MenuButton>
                    <MenuButton color="inherit">Faq</MenuButton>
                    <Switch onChange={changeModeHandler} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
