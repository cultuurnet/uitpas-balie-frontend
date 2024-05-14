"use client";

import { useConfig } from "@/shared/feature-config/context/useConfig";
import { useSearchParams } from "next/navigation";
import { Button } from "@/mobile/lib/ui";
import { ButtonProps } from "@mui/material";

export const LoginButton = ({ ...props }: ButtonProps) => {
  const { publicRuntimeConfig } = useConfig();
  const search = useSearchParams();
  const destination = search.get("redirectTo") ?? "/";
  const href = `${
    publicRuntimeConfig?.oauthPath ?? "/"
  }?destination=${destination}`;

  return (
    <Button component="a" href={href} {...props}>
      {props.children}
    </Button>
  );
};
