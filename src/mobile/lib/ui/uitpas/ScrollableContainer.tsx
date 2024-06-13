"use client";

import { Stack, styled } from "@mui/material";

export const ScrollableContainer = styled(Stack)(({ theme }) => ({
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    width: "6px",
    color: theme.palette.primary.main,
  },
  "::-webkit-scrollbar-track-piece": {
    background: "transparent",
  },
  "::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.main,
    borderRadius: "10px",
  },
  msOverflowStyle: "none",
  mb: 3,
  paddingRight: "8px",
  gap: "12px",
}));
