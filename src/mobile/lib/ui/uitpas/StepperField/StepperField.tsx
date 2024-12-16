"use client";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Add, Remove } from "@mui/icons-material";

type StepperFieldProps = {
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
  incrementValue?: number;
  maxValue?: number;
  subtitle?: string;
};

export const StepperField = ({
  value,
  onChange,
  incrementValue = 1,
  maxValue,
  subtitle,
}: StepperFieldProps) => {
  const theme = useTheme();

  const handleIncrement = () => {
    onChange(value + incrementValue);
  };

  const handleDecrement = () => {
    const newValue = value - incrementValue;
    onChange(Math.max(1, newValue));
  };

  const handleTextfieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.valueAsNumber;
    onChange(newValue);
  };

  const handleBlur = () => {
    if (isNaN(value)) {
      onChange(1);
    } else if (maxValue !== undefined && value > maxValue) {
      onChange(maxValue);
    } else {
      onChange(value);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: `${subtitle ? "12px" : "4px"}`,
        }}
      >
        <IconButton
          onClick={handleDecrement}
          disableRipple
          sx={{
            background: theme.palette.neutral[100],
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: "6px",
            borderBottomLeftRadius: "6px",
            border: `1px solid ${theme.palette.neutral[300]}`,
            width: "44px",
            height: "37px",
          }}
        >
          <Remove />
        </IconButton>
        <Box
          component="input"
          type="number"
          value={value}
          onChange={handleTextfieldChange}
          onBlur={handleBlur}
          sx={{
            width: "80px",
            px: "12px",
            height: "37px",
            borderTop: `1px solid ${theme.palette.neutral[300]}`,
            borderBottom: `1px solid ${theme.palette.neutral[300]}`,
            borderLeft: "none",
            borderRight: "none",
            fontSize: "16px",
            ":focus": {
              outline: "none",
            },
          }}
        />
        <IconButton
          onClick={handleIncrement}
          disableRipple
          disabled={!!(maxValue && value >= maxValue)}
          sx={{
            background: theme.palette.neutral[0],
            borderTopRightRadius: "6px",
            borderBottomRightRadius: "6px",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            border: `1px solid ${theme.palette.neutral[300]}`,
            width: "44px",
            height: "37px",
          }}
        >
          <Add />
        </IconButton>
      </Box>
      {subtitle && (
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.neutral[500],
            fontWeight: 500,
            letterSpacing: "0.1px",
            paddingTop: "6px",
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};
