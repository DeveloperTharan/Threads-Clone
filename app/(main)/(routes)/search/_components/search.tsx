"use client";

import React, { useEffect, useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { getThreadsBySearch } from "@/data/search";
import { ThreadUi } from "@/components/threads/thread-ui";

import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";

export const Search = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const debouncedValue = useDebounce(searchValue, 2000);

  useEffect(() => {
    if (
      debouncedValue !== undefined &&
      debouncedValue.replaceAll(" ", "") !== ""
    ) {
      const fetchData = async () => {
        try {
          const res = await getThreadsBySearch(debouncedValue);
          setSearchResult(res as any[]);
        } catch (error) {
          console.error("Error fetching threads:", error);
        }
      };

      fetchData();
    }
  }, [debouncedValue]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
      <Input
        size="lg"
        color="secondary"
        variant="bordered"
        placeholder="Search '@xxx' (or) xxx"
        onChange={(e) => setSearchValue(e.target.value)}
        startContent={<SearchIcon size={20} className="text-neutral-600" />}
      />
      {!searchResult ||
        (searchResult.length == 0 && (
          <p className="text-sm text-neutral-600 text-center w-full my-10">
            No search results
          </p>
        ))}
      {searchResult.map((threads, index) => (
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
  );
};
