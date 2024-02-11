import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const res = await db.user.findUnique({
      where: {
        userId,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log("[PROFILE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
