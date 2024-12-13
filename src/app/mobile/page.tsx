"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { clientRoutes } from "@/mobile/feature-routing";

// I didn't see a homepage on the mobile designs, perhaps this is still a WiP?
// Currently, I am redirecting to the counters page.
const RedirectToMobileActivities = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(clientRoutes.counters());
  }, [router]);
  return null;
};

export default RedirectToMobileActivities;
