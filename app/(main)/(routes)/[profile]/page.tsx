import React from "react";
import { Metadata } from "next";
import { getUserByName } from "@/data/user";
import { getProfile } from "@/data/profile";
import { Spinner } from "@/components/ui/spinner";
import { UserInfo } from "@/components/user/user-info";
import { cn } from "@nextui-org/react";
import { redirect } from "next/navigation";

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
  const { profile } = params.params;

  if (profile === undefined) return redirect("/");

  const user_name = `@${profile.slice(3)}`;

  const { profileData, gender } = await getProfile(user_name);

  return (
    <>
      {!profile || profile === null || undefined ? (
        <div className="h-auto min-h-[calc(100vh-4rem)] w-full flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      ) : (
        <div className="w-full md:w-[60%] mx-auto">
          <UserInfo userData={profileData} gender={gender} />
          <div
            className={cn(
              "w-full h-auto flex flex-col justify-start items-start gap-4"
            )}
          >
            {profileData?.threads.length == 0 || null ? (
              <p className="flex justify-center items-center w-full h-full text-neutral-500">
                No Threads
              </p>
            ) : (
              <>
                {profileData?.threads.map((data, index) => (
                  <div
                    key={index}
                    className="w-full h-full flex flex-col items-start justify-start border-b border-spacing-10 pb-4"
                  >
                    {/* <ThreadUi
                userImage={profileData?.imageURL}
                userId={profileData?.id}
                userName={profileData?.user_name}
                id={data.id}
                description={data.description || ""}
                assert={data.assert || ""}
                autherId={data.authuserId}
                likeCount={data.like_count}
                likes={data.likes}
                date={data.createdAt}
                commands={data.commands}
                url={data.threadUrl!}
              /> */}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
