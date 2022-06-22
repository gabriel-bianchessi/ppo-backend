/*
  Warnings:

  - The primary key for the `Evento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Pessoa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tipo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Convite` DROP FOREIGN KEY `Convite_eventoId_fkey`;

-- DropForeignKey
ALTER TABLE `Convite` DROP FOREIGN KEY `Convite_pessoaId_fkey`;

-- DropForeignKey
ALTER TABLE `TipoEvento` DROP FOREIGN KEY `TipoEvento_eventoId_fkey`;

-- DropForeignKey
ALTER TABLE `TipoEvento` DROP FOREIGN KEY `TipoEvento_tipoId_fkey`;

-- AlterTable
ALTER TABLE `Convite` MODIFY `pessoaId` VARCHAR(191) NOT NULL,
    MODIFY `eventoId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Evento` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Pessoa` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Tipo` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `TipoEvento` MODIFY `eventoId` VARCHAR(191) NOT NULL,
    MODIFY `tipoId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Convite` ADD CONSTRAINT `Convite_pessoaId_fkey` FOREIGN KEY (`pessoaId`) REFERENCES `Pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Convite` ADD CONSTRAINT `Convite_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipoEvento` ADD CONSTRAINT `TipoEvento_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `Tipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipoEvento` ADD CONSTRAINT `TipoEvento_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
