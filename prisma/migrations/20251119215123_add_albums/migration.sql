/*
  Warnings:

  - You are about to drop the column `image` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Album` table. All the data in the column will be lost.
  - Added the required column `title` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "cover" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL;
