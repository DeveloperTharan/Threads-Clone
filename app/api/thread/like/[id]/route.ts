import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, params: { params: { id: string } }) {
  try {
    const { userId } = auth();
    const { id } = params.params;
    const { userid } : { userid: string } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 400 });
    if (!id) return new NextResponse("THREAD_ID_MISSING", { status: 400 });

    const thread = await db.threads.findUnique({
      where: {
        id,
      },
    });

    if (!thread) {
      return new NextResponse("Thread not found", { status: 401 });
    }

    const existingLike = await db.likes.findUnique({
      where: {
        threadId_userId: {
          threadId: id,
          userId: userid,
        },
      },
    });

    if (existingLike) {
      await db.likes.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
        await db.likes.create({
            data: {
              threadId: id,
              userId: userid,
            },
          });
    }

    const likeCount = await db.likes.count({
      where: {
        threadId: id,
      },
    });

    const res = await db.threads.update({
      where: {
        id,
      },
      data: {
        like_count: likeCount,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log("[THREAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
