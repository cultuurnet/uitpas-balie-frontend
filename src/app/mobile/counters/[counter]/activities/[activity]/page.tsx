"use client";

import { useCounter } from "@/shared/feature-counter/context/useCounter";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { clientRoutes } from "@/mobile/feature-routing";
import { useActivity } from "@/mobile/feature-activities/useActivity";
import { getIdFromUrl } from "@/shared/lib/utils";

export default function ActivityPage() {
  const { activeCounter } = useCounter();
  const { selectedActivity } = useActivity();
  const router = useRouter();
  const selectedActivityId = selectedActivity?.["@id"];

  useEffect(() => {
    if (activeCounter && selectedActivityId)
      router.push(
        clientRoutes.identification(
          activeCounter.id,
          getIdFromUrl(selectedActivityId)
        )
      );
  });

  return null;
}
