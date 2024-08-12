/*
  Warnings:

  - The primary key for the `Article` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `link` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pubDate` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP CONSTRAINT "Article_pkey",
ADD COLUMN     "enclosureUrl" TEXT,
ADD COLUMN     "itunesAuthor" TEXT,
ADD COLUMN     "itunesDuration" TEXT,
ADD COLUMN     "itunesEpisodeType" TEXT,
ADD COLUMN     "itunesExplicit" BOOLEAN,
ADD COLUMN     "itunesImage" TEXT,
ADD COLUMN     "itunesSubtitle" TEXT,
ADD COLUMN     "itunesSummary" TEXT,
ADD COLUMN     "itunesTitle" TEXT,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "pubDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subtitle" TEXT,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Article_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Article_id_key" ON "Article"("id");
