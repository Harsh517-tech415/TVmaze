import React, { useContext, useEffect, useRef, useState } from "react";
import { searchData } from "../App";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
const Result = () => {
  const navigate = useNavigate();
  const { result } = useContext(searchData);
  const [genres, setGenres] = useState([]);
  let genresIndex = useRef({
    Action: [],
    Adult: [],
    Adventrues: [],
    Anime: [],
    Childern: [],
    Comedy: [],
    Crime: [],
    DIY: [],
    Drama: [],
    Espionage: [],
    Family: [],
    Fantasy: [],
    Food: [],
    History: [],
    Horror: [],
    Legal: [],
    Medical: [],
    Music: [],
    Romance: [],
    Thriller: [],
    Supernatural: [],
    Mystery: [],
    Nature: [],
    Sports: [],
    Travel: [],
    War: [],
    Western: [],
    Adventure: [],
    ScienceFiction: [],
    Show: [],
    Children: [],
  });
  useEffect(() => {
    result.forEach((item, index) => {
      if (item.show.genres.length > 0) {
        item.show.genres.forEach((value) => {
          if (value != "Science-Fiction") {
            genresIndex.current[value] = [...genresIndex.current[value], index];
            setGenres((genres) => [...genres, value]);
          } else if (value === "Science-Fiction") {
            genresIndex.current["ScienceFiction"] = [
              ...genresIndex.current["ScienceFiction"],
              index,
            ];
            setGenres((genres) => [...genres, "ScienceFiction"]);
          }
        });
      } else {
        genresIndex.current["Show"] = [...genresIndex.current["Show"], index];
        setGenres((genres) => [...genres, "Show"]);
      }
    });
    setGenres((genres) => [...new Set(genres)]);
    {
      console.log(genresIndex.current);
    }
  }, []);

  return (
    <Stack>
      {genres.map((item) => (
        <Box key={item}>
          <CardContent sx={{fontSize:"20px",fontWeight:"bold"}}>{item}</CardContent>
          <Stack
            direction="row"
            id="slider"
            sx={{ overflowX: "scroll", justifyContent: "left", pl: "20px" }}
            gap={1}
          >
            {genresIndex.current[item].map((index) => {
              const data = result[index];
              return (
                <Card
                  sx={{
                    minWidth: "200px",
                    maxWidth: "200px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(`/${data["show"]["id"]}`);
                  }}
                >
                  {data["show"]["image"] != null ? (
                    <CardMedia
                      component="img"
                      src={data["show"]["image"]["original"]}
                    />
                  ) : (
                    <></>
                  )}
                  <Stack direction="row" gap={1}>
                    {" "}
                    <Typography>
                      <StarIcon sx={{ color: "#f5c518" }} />
                    </Typography>
                    <Typography sx={{ mt: "1%" }}>
                      {data["show"]["rating"]["average"]}
                    </Typography>
                  </Stack>
                  <CardContent sx={{ fontWeight: "bold", textAlign: "center" }}>
                    {data["show"]["name"]}
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default Result;
