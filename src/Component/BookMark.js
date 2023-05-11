import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
const cookies = require("js-cookie");
const BookMark = () => {
  const [id, setId] = useState([]);
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const docRef = doc(db, `${cookies.get("!@#")}`, "BookMark");
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        if (data.id.length === 0) {
          console.log("No data");
        } else {
          setId(data.id);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    async function fetchShows() {
      try {
        const showPromises = id.map(async (item) => {
          const response = await axios.get(
            `https://api.tvmaze.com/shows/${item}`
          );
          return response.data;
        });

        const showData = await Promise.all(showPromises);
        setShows(showData);
      } catch (err) {
        console.log(err);
      }
    }

    fetchShows();
  }, [id]);

  return (
    <Container sx={{ mt: "2%" }}>
      <Stack direction="row" gap={3} flexWrap="wrap"
        justifyContent="center">
        {shows.map((show) => (
          <Card key={show.id}>
            <CardMedia component="img" src={show.image.medium} />
            <CardContent>
              {" "}
              <Stack direction="row" gap={1}>
                <StarIcon sx={{ color: "#f5c518" }} />
                <Typography sx={{ mt: "1%" }}>{show.rating.average}</Typography>
              </Stack>
            </CardContent>
            <CardContent
              sx={{ textAlign: "center", fontWeight: "bold",cursor:"pointer" }}
              onClick={() => {
                navigate(`/${show["id"]}`);
              }}
            >
              {show.name}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default BookMark;
