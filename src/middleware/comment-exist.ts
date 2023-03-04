import { prisma } from "../service/prisma";

export async function checkIfCommentExists(id: number): Promise<Boolean> {
  const comment = await prisma.comments.findUnique({
    where: {
      id_comment: id,
    },
  });
  if (!comment) {
    return false;
  }
  return true;
}
