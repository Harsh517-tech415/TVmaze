import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Pagination, Stack } from "@mui/material";
import ShowCard from "./ShowCard";
const Home = () => {
  const [shows, setShows] = useState([]);
  const [currentShows,setCurrentShows]=useState([])
  const showsPerPage=15;
  const [currentPage,setCurrentPage]=useState(1);
  let lastIndex=showsPerPage*currentPage;
  let firstIndex=lastIndex-showsPerPage;

  const axiosInstance = axios.create({
    baseURL: " https://api.tvmaze.com/",
  });
  useEffect(() => {
    async function getData() {
      const data = await axiosInstance
        .get("/shows")
        .then((res) => {
          setShows(res.data);

          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, []);
  useEffect(()=>{
    setCurrentShows(shows.slice(firstIndex,lastIndex))

  },[shows])
  useEffect(()=>{
    lastIndex=showsPerPage*currentPage;
    firstIndex=lastIndex-showsPerPage;
    setCurrentShows(shows.slice(firstIndex,lastIndex))
  },[currentPage])
   function paginate(e,value)
  {
    setCurrentPage(value);

  }
  return (
    <Container>
      <Stack
        direction="row"
        sx={{ gap: { lg: "80px", xs: "50px" },mt:"4%"}}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentShows.map((item) => {
          return (
            <>
              <ShowCard item={item} />
            </>
          );
        })}
      </Stack>
      <Stack sx={{mt:"50px",alignItems:"center"}}>
        {shows.length>15 &&(
          
          <Pagination
          count={Math.ceil(shows.length/showsPerPage)}
          variant="outlined"
          color="primary"
          defaultPage={1}
          onChange={paginate}/>
        )}
      </Stack>
    </Container>
  );
};

export default Home;
