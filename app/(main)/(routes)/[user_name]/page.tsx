import React from "react";
import { Metadata } from "next";
import { getUserByName } from "@/data/user";

export async function generateMetadata(params: {
  params: { user_name: string };
}): Promise<Metadata> {
  const { user_name } = params.params;
  const { user } = await sliceUserName(user_name);

  return {
    title: user?.user_name,
  };
}

export default async function Profile(params: {
  params: { user_name: string };
}) {
  const { user_name } = params.params;
  const { user } = await sliceUserName(user_name);

  return <div>{user?.user_name}</div>;
}

const sliceUserName = async (data: string) => {
  const username = `@${data.slice(3)}`;
  const user = await getUserByName(username);

  return { user };
};
