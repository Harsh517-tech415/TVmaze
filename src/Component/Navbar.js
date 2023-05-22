import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext, useEffect, useRef, useState } from "react";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { searchData } from "../App";
const Navbar = () => {
  const navigate = useNavigate();
  const {  setResult,nav,setNav } = useContext(searchData);
  const [open, setOpen] = useState(false);
  const [shows, setShows] = useState([]);
  const [display, setDisplay] = useState("none");
  const [searchShows, setSearchShows] = useState([]);
  const [displayTextField,setDisplayTextField]=useState("none")
  const searchValue = useRef();
  const axiosInstance = axios.create({
    baseURL: "https://api.tvmaze.com/shows",
  });
  const handleClickOutside = (event) => {
    if (searchValue.current && !searchValue.current.contains(event.target)) {
      setDisplay("none");
    }
  };

  useEffect(() => {
    async function getData() {
      const data = await axiosInstance
        .get("")
        .then((res) => {
          setShows(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
    setDisplayTextField("none")
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  async function setData(value) {
    console.log(value)
    const data = await axios
      .get(` http://api.tvmaze.com/search/shows?q=${value}/`)
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate(`/result`);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LiveTvIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            onClick={() => {
              navigate("/");
            }}
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            TVMaze
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={() => {
                setOpen(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              open={open}
              onClose={() => {
                setOpen(false);
              }}
            >
              <List>
                <ListItem onClick={()=>{navigate('/')}}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem onClick={()=>{navigate('/bookmark')}}>
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bookmarks" />
                </ListItem>
                {nav?(<ListItem onClick={()=>{setNav(false)}}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>):(<ListItem onClick={()=>{navigate('/login')}}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>)}
              </List>
            </Drawer>
          </Box>
          <Box sx={{display:"flex",justifyContent:"center"}}>
          <LiveTvIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            TVMaze
          </Typography>
          </Box>
          <Stack
            direction="row"
            sx={{ display: { xs: "none", md: "flex" } }}
            gap={5}
          >
             <Typography
               sx={{
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Typography>
            <Typography
               sx={{
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => {
                navigate("/bookmark");
              }}
            >
              Bookmark
            </Typography>
              {nav?(<Typography
                 sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  document.cookie="!@#=";
                  setNav(false)
                }}
              >
                Logout
              </Typography>):(<Typography
                 sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Typography>)}
              </Stack>
             {displayTextField==="none"?(<Button sx={{ml: {xs:"10px",md:"100px"},color:"white"}} onClick={()=>{setDisplayTextField("ok")}}><SearchIcon />Search</Button>):(<TextField
      inputRef={searchValue}
      autoComplete="on"
      variant="standard"
      sx={{
        position:"relative",
        ml: {xs:"10px",md:"100px"},
        minWidth:"130px",
        maxWidth:"200px"
      }}
      placeholder="Enter show name"
      onClick={() => {
        setDisplay("ok");
      }}
      onChange={() => {
        const data = shows.filter((item) => {
          return item["name"].toLowerCase().includes(searchValue.current.value);
        });
        setSearchShows(data);
      }}
    />)}


            <Card
              onClose={() => {
                setDisplay("none");
              }}
              sx={{
                display: display,
                maxHeight: "200px",
                overflowY: "scroll",
                width: "inherit",
                position: "absolute",
                top: "calc(100% + 10px)", // Adjust the top value as per your requirement
                right: { xs: -10, sm: -10, md: 150, lg: 580, xl: 750 }, // Adjust the left value as per your requirement
                zIndex: 9,
              }}
            >
              {/* <Stack sx={{ overflowY: "scroll" }}> */}
                <InfiniteScroll
                  id="slider"
                  dataLength={searchShows.length}
                  loader={<h4>Loading...</h4>}
                >
                  {searchShows.map((item) => (
                    <Box
                      key={item.id}
                      onClick={() => {
                        setData(item["name"]);
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      {item.name}
                      <Divider />
                    </Box>
                  ))}
                </InfiniteScroll>
              {/* </Stack> */}
            </Card>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
