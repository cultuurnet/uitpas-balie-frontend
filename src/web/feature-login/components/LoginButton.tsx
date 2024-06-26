"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/web/lib/ui";
import { FC, PropsWithChildren } from "react";
import { useConfig } from "@/shared/feature-config/context/useConfig";

export const LoginButton: FC<PropsWithChildren> = ({ children }) => {
  const search = useSearchParams();
  const { publicRuntimeConfig } = useConfig();
  const destination = /*"/app_v1"; */ search.get("redirectTo") ?? "/";
  const href = `${
    publicRuntimeConfig?.oauthPath ?? "/"
  }?destination=${destination}`;

  return (
    <Button
      size="lg"
      component="a"
      href={href}
      variant="solid"
      // sx={{
      //   p: "10px 20px",
      //   fontSize: "18px",
      // }}
    >
      {children}
    </Button>
  );
};
