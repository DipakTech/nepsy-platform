import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getCurrentUserByEmail = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return { id: null, email: null };

  const currentUser = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    select: {
      id: true,
      email: true,
    },
  });

  return currentUser;
};
