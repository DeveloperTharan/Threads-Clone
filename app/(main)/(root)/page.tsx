import { getAllThreads } from "@/action/get-all-threads";
import { ThreadUi } from "@/components/thread-ui";
import { cn } from "@/lib/utils";
import React from "react";

export default async function MainPage() {
  const { data } = await getAllThreads();

  return (
    <div
      className={cn(
        "w-full h-auto flex flex-col justify-start items-start gap-4",
        data?.length! > 2 && "h-full"
      )}
    >
      {data?.length == 0 || null ? (
        <p className="flex justify-center items-center w-full h-full text-neutral-500">
          No Threads
        </p>
      ) : (
        <>
          {data?.map((data, index) => (
            <div
              key={index}
              className="w-full h-full flex flex-col items-start justify-start border-b border-spacing-10 pb-4"
            >
              <ThreadUi
                userName={data.user.user_name}
                userImage={data.user.imageURL}
                userId={data.user.id}
                id={data.id}
                description={data.description || ""}
                assert={data.assert || ""}
                autherId={data.authuserId}
                likeCount={data.like_count}
                likes={data.likes}
                date={data.createdAt}
                commands={data.commands}
                url={data.threadUrl!}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
