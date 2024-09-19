import { getCurrentUserByEmail } from "@/lib/getCurrentUserByEmail";
import { prisma } from "@/lib/prisma";

export const getCurrentUserSharesList = async () => {
  const currentUser = await getCurrentUserByEmail();

  if (!currentUser?.email && !currentUser?.id) return [];

  try {
    const usersAppliedShareList = await prisma.accountHolder.findMany({
      include: {
        shares: true,
      },
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return usersAppliedShareList ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
