import React, { useState, useEffect } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";
import { RAPID_API_URL, exerciseOptions, fetchData } from "../utils/fetchData";

const SearchExercises = ({
  bodyPart,
  exercises,
  setExercises,
  setBodyPart,
}) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        `${RAPID_API_URL}/exercises/bodyPartList`,
        exerciseOptions
      );

      setBodyParts(["all", ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const endPoint = `${RAPID_API_URL}/exercises`;
      const exercisesData = await fetchData(endPoint, exerciseOptions);

      const searchedExercises = exercisesData.filter((exercise) => {
        return (
          exercise.name.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search)
        );
      });

      setSearch("");
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" mt="37px" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign="center"
      >
        Awesome exercises <br /> you should know
      </Typography>

      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          value={search}
          placeholder="Search exercises"
          type="text"
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },

            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

        <Button
          className="search-btn"
          sx={{
            backgroundColor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            position: "absolute",
            right: 0,
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          isBodyParts
          bodyPart={bodyPart}
          data={bodyParts}
          setBodyPart={setBodyPart}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
