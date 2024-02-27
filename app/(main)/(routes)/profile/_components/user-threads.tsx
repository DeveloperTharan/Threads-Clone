import React from "react";

import { cn } from "@/lib/utils";
import { Gender, User, Threads, Commands, Likes } from "@prisma/client";

import { ThreadUi } from "@/components/thread-ui";

interface UserThreadsProps {
  userData: {
    gender: Gender | null;
    threads: (Threads & {
      likes: Likes[];
      commands: (Commands & {
        user: User;
      })[];
    })[];
  } & User;
}

export const UserThreads = ({ userData }: UserThreadsProps) => {
  return (
    <div
      className={cn(
        "w-full h-auto flex flex-col justify-start items-start gap-4",
        userData.threads.length > 2 && "h-full"
      )}
    >
      {userData.threads.length == 0 || null ? (
        <p className="flex justify-center items-center w-full h-full text-neutral-500">
          No Threads
        </p>
      ) : (
        <>
          {userData.threads.map((data, index) => (
            <div
              key={index}
              className="w-full h-full flex flex-col items-start justify-start border-b border-spacing-10 pb-4"
            >
              <ThreadUi
                userName={userData.user_name}
                userImage={userData.imageURL}
                id={data.id}
                description={data.description || ""}
                assert={data.assert || ""}
                autherId={data.authuserId}
                likeCount={data.like_count}
                likes={data.likes}
                date={data.createdAt}
                commands={data.commands}
                url={data.threadUrl}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
