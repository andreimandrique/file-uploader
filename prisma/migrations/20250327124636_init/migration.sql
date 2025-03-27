/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "limit" INTEGER NOT NULL DEFAULT 20971520,
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "File" (
    "file_id" SERIAL NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "public_id" VARCHAR(100) NOT NULL,
    "bytes" INTEGER NOT NULL,
    "secure_url" VARCHAR(255) NOT NULL,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("file_id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
