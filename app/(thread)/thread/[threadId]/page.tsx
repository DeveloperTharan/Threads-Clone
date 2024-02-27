import React from "react";

import { getThreadById } from "@/action/get-thread";
import { ThreadUi } from "@/components/thread-ui";
import { Spinner } from "@/components/ui/spinner";

export default async function ThreadIdPage(params: {
  params: { threadId: string };
}) {
  const { threadId } = params.params;
  const { thread } = await getThreadById(threadId);

  return (
    <div className="h-fit w-full md:w-5/6 lg:w-1/2 px-4 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {!thread || (thread === undefined && <Spinner size={"lg"} />)}
      <ThreadUi
        userName={thread?.user.user_name!}
        userImage={thread?.user.imageURL!}
        id={thread?.id!}
        description={thread?.description || ""}
        assert={thread?.assert || ""}
        autherId={thread?.authuserId!}
        likeCount={thread?.like_count!}
        likes={thread?.likes!}
        date={thread?.createdAt!}
        commands={thread?.commands!}
        url={thread?.threadUrl!}
      />
    </div>
  );
}
