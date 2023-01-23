/*
  Warnings:

  - Added the required column `password` to the `Professors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Professors" ADD COLUMN     "password" TEXT NOT NULL;
