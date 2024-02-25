import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface values {
  command: string;
  parentId: string;
  userid: string;
}

export async function POST(req: Request, params: { params: { id: string } }) {
  try {
    const { userId } = auth();
    const { id } = params.params;
    const { command, parentId, userid }: values = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 400 });
    if (!id) return new NextResponse("THREAD_ID_MISSING", { status: 400 });

    if (parentId === undefined) {
      const res = await db.commands.create({
        data: {
          threadId: id,
          userId: userid,
          command,
        },
      });

      return NextResponse.json(res, { status: 200 });
    }

    const res = await db.commands.create({
      data: {
        parentId,
        threadId: id,
        userId: userid,
        command,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log("[THREAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}