"use client";

import { createContext } from "react";
import { PublicRuntimeConfig } from "@/shared/feature-config/types";

export const ConfigContext = createContext<{
  config: { publicRuntimeConfig: PublicRuntimeConfig } | null;
}>({
  config: null,
});
