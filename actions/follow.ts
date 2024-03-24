"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const toggleFollow = async ({
  followerUserId,
  followingUserId,
}: {
  followerUserId: string;
  followingUserId: string;
}) => {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  if (!followerUserId || !followingUserId) {
    return { error: "Missing follower or following user ID." };
  }

  const existingFollow = await db.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: followerUserId,
        followingId: followingUserId,
      },
    },
  });

  if (existingFollow) {
    await db.follows.delete({
      where: {
        followerId_followingId: {
          followerId: followerUserId,
          followingId: followingUserId,
        },
      },
    });
    return { success: "Unfollowed" };
  }

  await db.follows.create({
    data: {
      followerId: followerUserId,
      followingId: followingUserId,
    },
  });
  return { success: "Followed" };
};
