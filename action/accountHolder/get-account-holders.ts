import { getCurrentUserByEmail } from "@/lib/getCurrentUserByEmail";
import { prisma } from "@/lib/prisma";

export const getAccountHolders = async () => {
  try {
    const currentUser = await getCurrentUserByEmail();

    if (!currentUser?.id) return [];

    const getAccounts = await prisma.accountHolder.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return getAccounts;
  } catch (error) {
    console.log(error);
    return [];
  }
};
