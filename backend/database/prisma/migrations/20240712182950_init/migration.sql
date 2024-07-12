-- CreateTable
CREATE TABLE `Colaborador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `setor` VARCHAR(255) NOT NULL,
    `matricula` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Colaborador_email_key`(`email`),
    UNIQUE INDEX `Colaborador_matricula_key`(`matricula`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
