import React from "react";
import { Metadata } from "next";
import { Search } from "./_components/search";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Search - Threads",
  };
}

export default async function SearchPage() {
  return (
    <div className="h-full w-full md:w-[60%] mx-auto px-5 md:px-0 pb-20 md:pb-0">
      <Search />
    </div>
  );
}
