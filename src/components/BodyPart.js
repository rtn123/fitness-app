import React from "react";
import { Stack, Typography } from "@mui/material";
import Icon from "../assets/icons/gym.png";

const BodyPart = ({ item, bodyPart, setBodyPart }) => {
  const styles = {
    borderBottomLeftRadius: "20px",
    width: "270px",
    height: "270px",
    cursor: "pointer",
    gap: "47px",
  };

  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={
        item === bodyPart
          ? {
              borderTop: "4px solid #FF2625",
              backgroundColor: "#fff",
              ...styles,
            }
          : styles
      }
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      }}
    >
      <img
        src={Icon}
        alt="dumbbell"
        style={{ width: "40px", height: "40px" }}
      ></img>

      <Typography
        fontSize="24px"
        fontWeight="bold"
        color="#3a1212"
        textTransform="capitalize"
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;
