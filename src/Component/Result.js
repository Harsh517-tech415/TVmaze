import React, { useContext, useEffect, useRef, useState } from "react";
import { searchData } from "../App";
import { Box, Card, CardContent, Stack } from "@mui/material";

const Result = () => {
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
    {console.log(genresIndex.current)}

  }, []);

  return (
    <Stack>
      {genres.map((item) => (
        <Box key={item}>
          <CardContent>{item}</CardContent>
          <Stack direction="row" sx={{ overflowX: "scroll" }}>
            {(genresIndex.current[item].map((index) => {
                const data = result[index];
              return(<Card>{data['score']}</Card>)
            }))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default Result;
