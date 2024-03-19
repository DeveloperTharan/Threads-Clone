"use client";

import React, { useEffect, useState } from "react";

import { getAllThreads } from "@/data/thread";
import { Spinner } from "@/components/ui/spinner";
import { useInView } from "react-intersection-observer";
import { ThreadUi } from "@/components/threads/thread-ui";

export const LoadMore = () => {
  const [threads, setThreads] = useState<any[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState<number>(1);

  const { ref, inView } = useInView();

  const loadMore = async () => {
    const nextPage = pagesLoaded + 1;
    const newThreads: any[] = (await getAllThreads({ page: nextPage })) ?? [];
    setThreads((prevThreads) => [...prevThreads, ...newThreads]);
    setPagesLoaded(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return (
    <>
      <div className="h-full flex flex-col space-y-5 w-full">
        {threads?.map((threads, index) => (
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
      </div>
      <div className="w-full flex items-center justify-center p-4" ref={ref}>
        <Spinner size={"lg"} />
      </div>
    </>
  );
};
