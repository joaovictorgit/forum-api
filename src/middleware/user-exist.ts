import { prisma } from "../service/prisma";

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
