"use server";

import { getCurrentUserByEmail } from "@/lib/getCurrentUserByEmail";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const deleteShareEntry = async (id: string) => {
  try {
    const currentUser = await getCurrentUserByEmail();
    if (!currentUser?.id)
      return NextResponse.json({
        message: "error finding user..",
      });

    const deletedShare = await prisma.share.delete({
      where: {
        id,
      },
    });
    revalidatePath("action/share/getCurrentUserSharesList");
    return deletedShare;
  } catch (error) {
    console.log(error);
    return {
      message: "error adding share",
    };
  }
};
