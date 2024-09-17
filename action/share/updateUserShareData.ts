"use server ";

import { prisma } from "@/lib/prisma";

export type AllottedIPO = {
  boid: string;
  allotted_kitta: number;
};

export async function updateSharesWithAllottedIPOs(
  allottedIPOs: AllottedIPO[],
) {
  const updates = allottedIPOs.map(async (ipo) => {
    try {
      const updatedShare = await prisma.share.update({
        where: { boid: ipo.boid },
        data: {
          kitta: ipo.allotted_kitta,
          status: "ALLOTTED",
          updatedAt: new Date(),
        },
      });
      console.log(updatedShare, "updated share..");
      return { success: true, boid: ipo.boid };
    } catch (error) {
      //   console.error(`Error updating share for BOID ${ipo.boid}:`, error);
      console.log(error);
      return {
        success: false,
        boid: ipo.boid,
        error: (error as Error).message,
      };
    }
  });

  const results = await Promise.all(updates);

  // Revalidate the path where you display the shares data

  return results;
}
