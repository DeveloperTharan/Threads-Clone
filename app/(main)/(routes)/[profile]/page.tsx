import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getProfile } from "@/data/profile";
import { getUserByName } from "@/data/user";

import { Spinner } from "@/components/ui/spinner";
import { UserInfo } from "@/components/user/user-info";
import { ThreadUi } from "@/components/threads/thread-ui";

import { Lock } from "lucide-react";
import { cn } from "@nextui-org/react";

export async function generateMetadata(params: {
  params: { profile: string };
}): Promise<Metadata> {
  const { profile } = params.params;
  const user_name = `@${profile.slice(3)}`;
  const user = await getUserByName(user_name);

  return {
    title: user?.user_name,
  };
}

export default async function Profile(params: { params: { profile: string } }) {
  const session = await auth();

  const { profile } = params.params;

  if (profile === undefined) return redirect("/");

  const user_name = `@${profile.slice(3)}`;

  const { profileData, gender } = await getProfile(user_name);

  const isPrivateAndNotFollowing =
    session?.user.id !== profileData?.id &&
    profileData?.accountType === "Private" &&
    !profileData.following.some(
      (data) => data.followingId === session?.user.id
    );

  return (
    <>
      {!profile || profile === null || undefined ? (
        <div className="h-auto min-h-[calc(100vh-4rem)] w-full flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      ) : (
        <div className="w-full h-full md:w-[60%] mx-auto">
          <UserInfo userData={profileData} gender={gender} />
          {isPrivateAndNotFollowing ? (
            <div className="w-full flex flex-col items-center justify-center space-y-5">
              <Lock
                size={100}
                className="p-6 border border-neutral-500 text-neutral-500 rounded-full"
              />
              <p className="text-neutral-500 text-center">Private Account</p>
            </div>
          ) : (
            <div
              className={cn(
                "h-full flex flex-col space-y-5 w-full",
                profileData?.threads.length! > 0 && "pb-32 px-5 md:px-0"
              )}
            >
              {profileData?.threads.length == 0 && (
                <p className="flex justify-center items-center w-full text-neutral-500">
                  No Threads
                </p>
              )}
              {profileData?.threads.length! > 0 && (
                <>
                  {profileData?.threads.map((threads, index) => (
                    <div
                      key={index}
                      className="h-full w-full flex flex-col items-start justify-start border-b border-spacing-10
                      border-neutral-700 pb-4"
                    >
                      <ThreadUi
                        userData={{
                          user_id: profileData.id,
                          user_image: profileData.image,
                          user_name: profileData.user_name,
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
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
