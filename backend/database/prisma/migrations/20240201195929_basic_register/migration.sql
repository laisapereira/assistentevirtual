/*
  Warnings:

  - You are about to drop the column `lead` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `ramal` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `lead` on the `user_department` table. All the data in the column will be lost.
  - You are about to drop the column `ramal` on the `user_department` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `department` DROP COLUMN `lead`,
    DROP COLUMN `ramal`;

-- AlterTable
ALTER TABLE `user_department` DROP COLUMN `lead`,
    DROP COLUMN `ramal`;
