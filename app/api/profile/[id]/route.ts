import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, params: { params: { id: string } }) {
  try {
    const { userId } = auth();
    const { id } = params.params;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const values = await req.json();

    const res = await db.user.update({
      where: {
        id,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log("[PROFILE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, params: { params: { id: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params.params;

    await db.user.delete({
      where: {
        id,
        userId,
      },
      include: {
        threads: true,
      }
    });

    await clerkClient.users.deleteUser(userId);

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.log("[PROFILE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
