import React from "react";
import { getAllThreads } from "@/data/thread";
import { LoadMore } from "./_components/load-more";
import { ThreadUi } from "@/components/threads/thread-ui";

export default async function HomePage() {
  const threads = await getAllThreads({ page: 1 });

  return (
    <div className="h-full flex flex-col space-y-5 w-full md:w-[60%] mx-auto px-5 md:px-0 pb-20 md:pb-0">
      {/* {threads?.map((threads, index) => (
        <div
          key={index}
          className="h-full w-full flex flex-col items-start justify-start border-b border-spacing-10
          border-neutral-700 pb-4"
        >
          <ThreadUi
            userData={{
              user_id: threads?.user?.id,
              user_image: threads?.user?.image,
              user_name: threads?.user?.user_name,
            }}
            threadData={{
              body: threads.body,
              likes: threads.likes,
              thread_id: threads.id,
              assert: threads.assert,
              commands: threads.command,
              createAt: threads.createdAt,
              like_count: threads.like_count,
              thread_url: threads.threadUrl,
            }}
          />
        </div>
      ))}
      <LoadMore /> */}
    </div>
  );
}
