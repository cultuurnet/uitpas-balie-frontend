"use client";

import { useTranslation as useNextTranslation } from "@/shared/lib/i18n/client";
import { EventName } from "../../dataAccess/search/generated/model";

export const useTranslation = () => {
  const { t, i18n } = useNextTranslation();

  return { t, i18n, LANG_KEY: i18n.language as keyof EventName };
};
