/*
  Warnings:

  - Added the required column `lead` to the `User_Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ramal` to the `User_Department` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_department` ADD COLUMN `lead` VARCHAR(191) NOT NULL,
    ADD COLUMN `ramal` INTEGER NOT NULL;
