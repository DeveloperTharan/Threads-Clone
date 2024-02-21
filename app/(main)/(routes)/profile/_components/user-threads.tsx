import React from "react";

import { cn } from "@/lib/utils";
import { Gender, Follows, User, Threads } from "@prisma/client";

import { ThreadUi } from "@/components/thread-ui";

interface UserThreadsProps {
  userData: {
    gender: Gender | null;
    followers: Follows[];
    following: Follows[];
    threads: Threads[];
  } & User;
}

export const UserThreads = ({ userData }: UserThreadsProps) => {
  return (
    <div
      className={cn(
        "w-full h-auto flex flex-col justify-start items-start gap-4",
        userData.threads.length > 0 && "pb-28 md:pb-10"
      )}
    >
      {userData.threads.length == 0 || undefined ? (
        <p className="flex justify-center items-center w-full h-full text-neutral-500">
          No Threads
        </p>
      ) : (
        <>
          {userData.threads.map((data, index) => (
            <div
              key={index}
              className="w-full h-fit flex flex-col items-start justify-start"
            >
              <ThreadUi
                userName={userData.user_name}
                userImage={userData.imageURL}
                id={data.id}
                description={data.description || ""}
                assert={data.assert || ""}
                autherId={data.authuserId}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
