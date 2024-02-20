import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, params: { params: { id: string } }) {
  try {
    const { userId } = auth();
    const { id } = params.params;

    if (!userId) return new NextResponse("Unauthorized", { status: 400 });
    if (!id)
      return new NextResponse("NO_THREAD_ARE_AVAILABLE", { status: 500 });

    const res = await db.threads.delete({
      where: {
        id,
      },
      include: {
        commands: true,
        likes: true,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log("[THREAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
