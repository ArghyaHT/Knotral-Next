"use client"; // Add this
import { Suspense } from "react";
import RequestDemoPage from "./RequestDemoPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RequestDemoPage /> {/* This must have "use client" at the top */}
    </Suspense>
  );
}
