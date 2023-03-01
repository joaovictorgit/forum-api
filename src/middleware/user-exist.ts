import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function checkIfUserExist(user_id: number): Promise<Boolean> {
  const user = await prisma.user.findUnique({
    where: {
      id_user: user_id,
    },
  });
  if (!user) {
    return false;
  }
  return true;
}
