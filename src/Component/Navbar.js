import { AppBar, Box, Button, Container, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import LiveTvIcon from '@mui/icons-material/LiveTv';
import {useNavigate} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
const Navbar = () => {
    const navigate=useNavigate()
    const [open,setOpen]=useState(false)
  return (
    <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <LiveTvIcon sx={{display:{xs:'none',md:'flex'},mr:1}}/>
                <Typography 
                onClick={()=>{navigate('/')}}
                variant="h6"
                sx={{
                    mr:2,
                    display:{xs:'none',md:'flex'},
                    fontFamily:'monospace',
                    fontWeight:700,
                    letterSpacing:'.3rem',
                    color:"inherit",
                    textDecoration:"none",
                    cursor:"pointer"
                }}
                >
                    TVMaze
                </Typography>
                <Box sx={{flexGrow:1,display:{xs:"flex",md:"none"}}}>
                    <IconButton
                    size="large"
                    onClick={()=>{setOpen(true)}}>
                        <MenuIcon/>
                    </IconButton>
                    <Drawer open={open} onClose={()=>{setOpen(false);}}>
                        <List>
                            <ListItem>
                                <ListItemIcon><HomeIcon/></ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItem>
                        </List>
                    </Drawer>
                </Box>
                <LiveTvIcon sx={{display:{xs:'flex',md:'none'},mr:1}}/>
                <Typography
                variant="h5"
                noWrap
                sx={{
                    mr:2,
                    display:{xs:"flex",md:'none'},
                    flexGrow:1,
                    fontFamily:"monospace",
                    fontWeight:700,
                    letterSpacing:".3rem",
                    color:"inherit",
                    textDecoration:"none",
                    cursor:"pointer"
                }}>
                    TVMaze
                </Typography>
                <Stack direction="row" sx={{display:{xs:"none",md:"flex"}}} gap={10}>
                    <Typography onClick={()=>{navigate("/")}} sx={{textDecoration:"none",cursor:"pointer",fontWeight:"bold"}}>Shows</Typography>
                    <Typography onClick={()=>{navigate("/")}} sx={{textDecoration:"none",cursor:"pointer",fontWeight:"bold"}}>Movies</Typography>
                    <Typography onClick={()=>{navigate("/")}} sx={{textDecoration:"none",cursor:"pointer",fontWeight:"bold"}}>Actor</Typography>
                </Stack>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Navbar