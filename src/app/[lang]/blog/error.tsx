"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full">
      <h2>Something went absolutely wrong!</h2>
      <p>{error.message}</p>
      <p>If you happen to see me, throw me this junk</p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{error.stack}</code>
      </pre>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
