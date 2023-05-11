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
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { searchData } from "../App";
const Navbar = () => {
  const navigate = useNavigate();
  const {result,setResult}=useContext(searchData)
  const [open, setOpen] = useState(false);
  const [shows, setShows] = useState([]);
  const [searchShows, setSearchShows] = useState([]);

  const searchValue=useRef()
  const axiosInstance = axios.create({
    baseURL: "https://api.tvmaze.com/shows",
  });
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
  }, []);
  async function setData(value)
  {
    const data=await axios.get(` http://api.tvmaze.com/search/shows?q=${value}`).then((res)=>{setResult(res.data)}).catch((err)=>{console.log(err)})
    navigate(`/result`)
  }
 useEffect(()=>{console.log(result)},[result])
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
                <ListItem>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              </List>
            </Drawer>
          </Box>
          <LiveTvIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
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
          <Stack
            direction="row"
            sx={{ display: { xs: "none", md: "flex" } }}
            gap={10}
          >
            <Typography
              onClick={() => {
                navigate("/");
              }}
              sx={{
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Shows
            </Typography>
            <Typography
              onClick={() => {
                navigate("/");
              }}
              sx={{
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Movies
            </Typography>
            <Typography
              onClick={() => {
                navigate("/");
              }}
              sx={{
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Actor
            </Typography>
          </Stack>
          <Stack>
            <TextField
            inputRef={searchValue}
              sx={{
                display: { xs: "none", md: "flex" },
                backgroundColor: "white",
              }}
              placeholder="Enter show name"
              onChange={()=>{
                const data=shows.filter((item)=>{return (item['name'].toLowerCase().includes(searchValue.current.value))})
             setSearchShows(data) }}
            />
            <Card sx={{ width: "inherit",height:"300px" }}>
            <Stack>
            <InfiniteScroll
              dataLength={shows.length}
              loader={<h4>Loading...</h4>}
            >
                {searchShows.map((item)=>(<Box onClick={()=>{setData(item['name'])}} sx={{cursor:'pointer'}}>{item['name']}<Divider/></Box>))}
            </InfiniteScroll>
            </Stack>
            </Card>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
