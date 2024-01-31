/*
  Warnings:

  - Added the required column `lead` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ramal` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `department` ADD COLUMN `lead` VARCHAR(191) NOT NULL,
    ADD COLUMN `ramal` INTEGER NOT NULL;
