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
  const { result, setResult } = useContext(searchData);
  const [open, setOpen] = useState(false);
  const [shows, setShows] = useState([]);
  const [display,setDisplay]=useState("none")

  const [searchShows, setSearchShows] = useState([]);

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
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  async function setData(value) {
    const data = await axios
      .get(` http://api.tvmaze.com/search/shows?q=${value}`)
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
            gap={5}
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
  <Stack direction="row" gap={5}>
    <TextField
      inputRef={searchValue}
      autoComplete="on"
      sx={{
        backgroundColor: "white",
        ml: "100px",
        minWidth:"200px",
        maxWidth:"250px"
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
    />
    {/* <Typography
      variant="button"
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor:"pointer"
      }}
    >
      Search
    </Typography> */}
  </Stack>

  <Card
    onClose={() => {
      setDisplay("none");
    }}
    sx={{
      display: display,
      maxHeight: "200px",
      overflowY: "scroll",
      width:"inherit",
      position: "absolute",
      top: "calc(100% + 10px)", // Adjust the top value as per your requirement
      right: {xs:70,sm:100,md:180,lg:580,xl:750}, // Adjust the left value as per your requirement
      zIndex: 9,
    }}
  >
     <Stack sx={{ overflowY: "scroll" }}>
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
  </Stack>
  </Card>
</Stack>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
