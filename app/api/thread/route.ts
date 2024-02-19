import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type values = {
  description: string;
  assert: string;
  id: string;
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { description, assert, id }: values = await req.json();

    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

    const threadUrl: string = `${origin}/preview/${Math.round(Math.random() * 100000)}`;

    if (!userId) return new NextResponse("Unauthorized", { status: 400 });
    

    const res = await db.threads.create({
      data: {
        userId: id,
        description,
        assert,
        threadUrl,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log("[THREAD_ERROR]", error);
    return new NextResponse("Internall Error", { status: 500 });
  }
}
