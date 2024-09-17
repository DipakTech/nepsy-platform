import { getCurrentUserByEmail } from "@/lib/getCurrentUserByEmail";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const addShareEntry = async ({
  account_holder_name,
  boid,
  status,
  company_name,
  kitta,
}: {
  account_holder_name: string;
  boid: string;
  status: string;
  company_name: string;
  kitta: string;
}) => {
  try {
    const currentUser = await getCurrentUserByEmail();

    if (!currentUser?.id)
      return NextResponse.json({
        message: "error finding user..",
      });

    const addedShare = await prisma.share.create({
      data: {
        account_holder_name,
        boid: boid,
        company_name,
        kitta: Number(kitta),
        userId: currentUser.id,
      },
    });

    return addedShare;
  } catch (error) {
    console.log(error);
    return {
      message: "error adding share",
    };
  }
};
