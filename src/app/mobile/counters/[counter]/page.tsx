"use client";

import { useCounter } from "@/shared/feature-counter/context/useCounter";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clientRoutes } from "@/mobile/feature-routing";

export default function CounterPage() {
  const { activeCounter } = useCounter();
  const router = useRouter();

  useEffect(() => {
    if (activeCounter) router.push(clientRoutes.activities(activeCounter.id));
  });

  return null;
}
