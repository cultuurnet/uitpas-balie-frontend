"use client";

import { useConfig } from "@/shared/feature-config/context/useConfig";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { prefixWhenNotEmpty } from "@/shared/lib/utils";

export const useLegacyPath = () => {
  const { publicRuntimeConfig } = useConfig();
  const queryWithoutParams = useSearchParams();

  const asPath = usePathname();

  return useMemo(() => {
    const path = new URL(`http://localhost${asPath}`).pathname;

    const queryString = prefixWhenNotEmpty(
      new URLSearchParams(queryWithoutParams),
      "?"
    );

    return `${publicRuntimeConfig?.legacyAppUrl}${path}${queryString}`;
  }, [asPath, publicRuntimeConfig?.legacyAppUrl, queryWithoutParams]);
};
