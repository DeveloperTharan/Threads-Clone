"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

export default function ThreadPage({
  params,
}: {
  params: { threadId: string };
}) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  return (
    <div>
      {params.threadId} & {userId}
    </div>
  );
}
