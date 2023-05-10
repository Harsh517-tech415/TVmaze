import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Stack } from "@mui/material";
import ShowCard from "./ShowCard";
const Home = () => {
  const [shows, setShows] = useState([]);
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
  return (
    <Container>
      <Stack
        direction="row"
        sx={{ gap: { lg: "80px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {shows.map((item) => {
          return (
            <>
              <ShowCard item={item} />
            </>
          );
        })}
      </Stack>
    </Container>
  );
};

export default Home;
