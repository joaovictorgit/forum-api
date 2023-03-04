import { prisma } from "../service/prisma";

export async function checkIfCategoryExist(id: number): Promise<Boolean> {
  const category = await prisma.category.findUnique({
    where: {
      id_category: id,
    },
  });
  if (!category) {
    return false;
  }
  return true;
}
