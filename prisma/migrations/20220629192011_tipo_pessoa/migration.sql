-- AlterTable
ALTER TABLE `Pessoa` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Tipo` ADD COLUMN `tipePessoaId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `TipePessoa` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `pessoaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tipo` ADD CONSTRAINT `Tipo_tipePessoaId_fkey` FOREIGN KEY (`tipePessoaId`) REFERENCES `TipePessoa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipePessoa` ADD CONSTRAINT `TipePessoa_pessoaId_fkey` FOREIGN KEY (`pessoaId`) REFERENCES `Pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
