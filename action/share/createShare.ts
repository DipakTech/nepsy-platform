"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type AllottedIPO = {
  company_name: string;
  boid: string;
  kitta: number;
}[];

export async function createShare(allottedIPOs: AllottedIPO) {
  const results = await Promise.all(
    allottedIPOs.map(async (ipo) => {
      try {
        // Check if a share with the same company name already exists for this BOID
        const existingShare = await prisma.share.findFirst({
          where: {
            company_name: ipo.company_name,
            accountHolder: {
              boid: ipo.boid,
            },
          },
        });

        if (existingShare) {
          return {
            success: false,
            boid: ipo.boid,
            error: `Share for ${ipo.company_name} already exists for BOID ${ipo.boid}`,
          };
        }

        // If no existing share, create a new one
        const newShare = await prisma.share.create({
          data: {
            company_name: ipo.company_name,
            kitta: ipo.kitta,
            status: "allotted",
            accountHolder: {
              connect: {
                boid: ipo.boid,
              },
            },
          },
        });

        return { success: true, boid: ipo.boid, share: newShare };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            // This error code indicates a unique constraint violation
            console.error(
              `Unique constraint violated for company ${ipo.company_name} and BOID ${ipo.boid}`,
            );
            return {
              success: false,
              boid: ipo.boid,
              error: `A share for ${ipo.company_name} already exists. This may be due to a concurrent operation.`,
            };
          }
        }
        console.error(`Error processing share for BOID ${ipo.boid}:`, error);
        return {
          success: false,
          boid: ipo.boid,
          error: (error as Error).message,
        };
      }
    }),
  );

  // Here you could add logic to revalidate the path where you display the shares data
  // For example: revalidatePath('/shares');

  return results;
}
