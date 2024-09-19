import { getCurrentUserByEmail } from "@/lib/getCurrentUserByEmail";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const deleteAccountHolder = async (id: string) => {
  try {
    const currentUser = await getCurrentUserByEmail();

    if (!currentUser?.id) {
      return NextResponse.json({
        message: "Error finding user.",
        status: 404,
      });
    }

    // Now delete the AccountHolder using its id
    const deletedAccountHolder = await prisma.accountHolder.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/add-account");

    return NextResponse.json({
      message: "AccountHolder deleted successfully.",
      data: deletedAccountHolder,
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting AccountHolder:", error);
    return NextResponse.json({
      message: "Error deleting AccountHolder",
      error: (error as Error).message,
      status: 500,
    });
  }
};
