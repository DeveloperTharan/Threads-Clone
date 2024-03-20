import { Metadata } from "next";
import React from "react";
import { SearchComponent } from "./_components/search";
import { getAllUser } from "@/data/search";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Search - Threads",
  };
}

export default async function Search() {
  const user = await getAllUser({ page: 1 });
  return (
    <>
      <SearchComponent user={user} />
    </>
  );
}
