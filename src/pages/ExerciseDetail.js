import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";
import {
  exerciseOptions,
  youtubeOptions,
  fetchData,
} from "./../utils/fetchData";
import { RAPID_API_URL, YOUTUBE_API_URL } from "./../utils/fetchData";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExerciseData = async () => {
      const exerciseDetailData = await fetchData(
        `${RAPID_API_URL}/exercises/exercise/${id}`,
        exerciseOptions
      );

      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(
        `${YOUTUBE_API_URL}/search?query=${exerciseDetailData.name}`,
        youtubeOptions
      );

      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExercisesData = await fetchData(
        `${RAPID_API_URL}/exercises/target/${exerciseDetailData.target}`,
        exerciseOptions
      );

      setTargetMuscleExercises(targetMuscleExercisesData);

      const equipmentExercisesData = await fetchData(
        `${RAPID_API_URL}/exercises/equipment/${exerciseDetailData.equipment}`,
        exerciseOptions
      );

      setEquipmentExercises(equipmentExercisesData);
    };

    fetchExerciseData();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        name={exerciseDetail.name}
        exerciseVideos={exerciseVideos}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
