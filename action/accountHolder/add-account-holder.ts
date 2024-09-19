import { getCurrentUserByEmail } from "@/lib/getCurrentUserByEmail";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const addAccountHolder = async ({
  account_holder_name,
  boid,
}: {
  account_holder_name: string;
  boid: string;
}) => {
  try {
    const currentUser = await getCurrentUserByEmail();

    if (!currentUser?.id)
      return NextResponse.json({
        message: "error finding user..",
      });

    const addAccount = await prisma.accountHolder.create({
      data: {
        account_holder_name,
        boid: boid,
        userId: currentUser.id,
      },
    });

    revalidatePath("dashboard/add-account", "page");

    return addAccount;
  } catch (error) {
    console.log(error);
    return {
      message: "error adding share",
    };
  }
};
