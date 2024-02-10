import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  params: { params: { userId: string } }
) {
  try {
    const { userId } = params.params;
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const values = await req.json();

    const res = await db.user.update({
      where: {
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

export async function DELETE(
  req: Request,
  params: { params: { userId: string } }
) {
  try {
    const { userId } = params.params;
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const res = await db.user.delete({
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
