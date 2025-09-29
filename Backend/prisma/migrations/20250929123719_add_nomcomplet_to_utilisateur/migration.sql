/*
  Warnings:

  - Added the required column `nomcomplet` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Utilisateur` ADD COLUMN `nomcomplet` VARCHAR(191) NOT NULL;
