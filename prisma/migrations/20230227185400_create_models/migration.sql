-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "name_user" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Category" (
    "id_category" SERIAL NOT NULL,
    "name_category" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id_comment" SERIAL NOT NULL,
    "text_comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id_comment")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_category_key" ON "Category"("name_category");

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;
