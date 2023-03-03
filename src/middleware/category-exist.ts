import { prisma } from "../service/prisma";

export async function checkIfCategoryExist(name: string): Promise<Boolean> {
  const category = await prisma.category.findUnique({
    where: {
      name_category: name,
    },
  });
  if (!category) {
    return false;
  }
  return true;
}
