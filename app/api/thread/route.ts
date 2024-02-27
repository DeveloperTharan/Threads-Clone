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

    if (!userId) return new NextResponse("Unauthorized", { status: 400 });

    // Correctly construct the threadUrl after creating the thread
    const res = await db.threads.create({
      data: {
        userId: id,
        authuserId: userId,
        description,
        assert,
      },
    });

    // Use the id from the response to construct the threadUrl
    const threadUrl: string = `${process.env.BASE_URL}/thread/${res.id}`;

    // Update the thread with the constructed threadUrl
    await db.threads.update({
      where: {
        id: res.id,
      },
      data: {
        threadUrl,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log("[THREAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
