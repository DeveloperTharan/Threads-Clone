"use client";

import React, { useEffect, useState } from "react";

import { getAllUser } from "@/data/search";
import { Spinner } from "@/components/ui/spinner";
import { useInView } from "react-intersection-observer";
import { UserUi } from "./user-ui";

export const LoadMore = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState<number>(1);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      const loadMore = async () => {
        const nextPage = pagesLoaded + 1;
        const newUsers: any[] = (await getAllUser({ page: nextPage })) ?? [];
        setUsers((prevThreads) => [...prevThreads, ...newUsers]);
        setPagesLoaded(nextPage);
      };

      loadMore();
    }
  }, [inView]);

  return (
    <>
      <div className="w-full h-full flex flex-col space-y-2 pt-4">
        {users?.map((data, index) => (
          <div
            key={index}
            className="h-full w-full flex flex-col items-start justify-start border-b border-spacing-10
          border-neutral-700 pb-4"
          >
            <UserUi data={data} />
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center p-4" ref={ref}>
        <Spinner size={"lg"} />
      </div>
    </>
  );
};
