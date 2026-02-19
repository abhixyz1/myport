"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !process.env.NEXT_PUBLIC_POSTHOG_KEY
    ) {
      return;
    }
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      // The '2025-05-24' default enables history-based pageview capturing for SPAs.
      defaults: "2025-05-24",
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
