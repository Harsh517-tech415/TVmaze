import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Markup } from "interweave";
const Show = () => {
  const axiosInstance = axios.create({
    baseURL: "https://api.tvmaze.com/shows/",
  });
  const location = useLocation();
  const [shows, setShows] = useState({
    image: {},
    network: {},
    schedule: { days: [] },
    genres: [],
  });
  const [cast, setCast] = useState([
    { person: { name: "", image: { original: "" } }, character: { name: "" } },
  ]);
  useEffect(() => {
    async function getData() {
      
      const data = await axiosInstance
        .get(`${location.pathname}`)
        .then((res) => {
          setShows(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      const castData = await axiosInstance
        .get(`${location.pathname}/cast`)
        .then((res) => {
          setCast(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, []);
  return (
    <Box
      sx={{
        width: { lg: "1452px" },
        height: { lg: "819px" },
        p: { lg: "0px 24px" },
        ml: { lg: "352.500px" },
        mr: { lg: "10px" },
      }}
    >
      <Box>
        <CardContent sx={{ fontSize: "44px" }}>{shows["name"]}</CardContent>
        <CardContent>
          <Stack direction={{ xs: "column", lg: "row" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  width: { xs: "160px", md: "220px", lg: "260px" },
                  height: { xs: "235px", md: "279px", lg: "320px" },
                }}
              >
                <CardMedia component="img" src={shows["image"]["original"]} />
              </Card>
            </Box>

            <CardContent
              sx={{
                fontSize: "20px",
                maxWidth: { lg: "800px" },
                alignItem: "center",
              }}
            >
              <Markup content={shows["summary"]} />
            </CardContent>
            <Card sx={{ width: "300px", m: "auto" }}>
              <Card sx={{ backgroundColor: "#f7f7f7" }}>
                <Stack>
                  <CardContent>Show Info</CardContent>
                  <CardContent>
                    <Typography>Network:</Typography>
                    <Typography>{shows["network"]["name"]}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>Schedule:</Typography>
                    <Typography>
                      {shows["schedule"]["days"][0]} at{" "}
                      {shows["schedule"]["time"]}({shows["averageRuntime"]}min)
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>Status:</Typography>
                    <Typography>{shows["status"]}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>Show Type:</Typography>
                    <Typography>{shows["type"]}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography>Genres:</Typography>
                    <Typography>
                      {shows["genres"].map((item) => `  ${item} |`)}
                    </Typography>
                  </CardContent>
                </Stack>
              </Card>
            </Card>
          </Stack>
        </CardContent>
        <CardContent sx={{ fontSize: "30px" }}>Cast</CardContent>
        <CardContent>
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="center"
            >
              {cast.map((item) => (
                <Stack direction="row" spacing={2} columnGap={2} sx={{mt:1}}>
                  <Card sx={{ width: "150px" }}>
                    <CardMedia
                      component="img"
                      src={item["person"]["image"]["original"]}
                      sx={{height:"190px"}}
                    />
                  </Card>
                  <Stack sx={{width:"150px"}}>

                    <Typography sx={{ fontSize: "18px" }}>
                      {item["person"]["name"]}
                    </Typography>
                    <Typography>as {item["character"]["name"]}</Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
        </CardContent>
      </Box>
    </Box>
  );
};

export default Show;
