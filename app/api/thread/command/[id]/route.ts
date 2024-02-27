import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
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

    const commandData = {
      threadId: id,
      userId: userid,
      body,
      ...(parentId && { parentId }),
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

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    const { id }: { id: string } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 400 });

    // Start the recursive deletion process
    await deleteCommandAndChildren(db, id);

    return new NextResponse("Command and its children deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("[THREAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Define the recursive deletion function
async function deleteCommandAndChildren(
  db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  commandId: string
) {
  // Find all children of the current command
  const children = await db.commands.findMany({
    where: {
      parentId: commandId,
    },
  });

  // Recursively delete each child command
  for (const child of children) {
    await deleteCommandAndChildren(db, child.id);
  }

  // Delete the current command
  await db.commands.delete({
    where: {
      id: commandId,
    },
  });
}
