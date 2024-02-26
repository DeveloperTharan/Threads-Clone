import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface Values {
  body: string;
  parentId?: string; // Made optional to allow for root commands
  userid: string;
}

export async function POST(req: Request, params: { params: { id: string } }) {
  try {
    const { userId } = auth();
    const { id } = params.params;
    const { body, parentId, userid }: Values = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 400 });
    if (!id) return new NextResponse("THREAD_ID_MISSING", { status: 400 });

    // Adjusted to handle both root and nested commands
    const commandData = {
      threadId: id,
      userId: userid,
      body,
      ...(parentId && { parentId }), // Conditionally include parentId if it's provided
    };

    const res = await db.commands.create({
      data: commandData,
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log("[THREAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
