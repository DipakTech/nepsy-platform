import { getCurrentUserByEmail } from "@/lib/getCurrentUserByEmail";
import { prisma } from "@/lib/prisma";

export async function getAccountHoldersWithShares() {
  const currentUser = await getCurrentUserByEmail();

  if (!currentUser?.id) return [];
  try {
    const accountHolders = await prisma.accountHolder.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        shares: true,
      },
    });

    return accountHolders;
  } catch (error) {
    console.error("Error fetching account holders with shares:", error);
    return [];
  }
}
