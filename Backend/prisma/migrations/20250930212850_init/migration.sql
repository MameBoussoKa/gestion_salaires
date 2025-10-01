-- CreateTable
CREATE TABLE `Entreprise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `adresse` VARCHAR(191) NULL,
    `devise` VARCHAR(191) NOT NULL,
    `periode` VARCHAR(191) NOT NULL,
    `couleur` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomcomplet` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `entrepriseId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Utilisateur_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomComplet` VARCHAR(191) NOT NULL,
    `poste` VARCHAR(191) NOT NULL,
    `typeContrat` VARCHAR(191) NOT NULL,
    `tauxSalaire` DOUBLE NOT NULL,
    `coordonneesBancaires` VARCHAR(191) NULL,
    `actif` BOOLEAN NOT NULL DEFAULT true,
    `entrepriseId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CyclePaie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `periode` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `statut` VARCHAR(191) NOT NULL,
    `entrepriseId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bulletin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeId` INTEGER NOT NULL,
    `cyclePaieId` INTEGER NOT NULL,
    `brut` DOUBLE NOT NULL,
    `deductions` DOUBLE NOT NULL,
    `netAPayer` DOUBLE NOT NULL,
    `statut` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paiement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `montant` DOUBLE NOT NULL,
    `mode` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bulletinId` INTEGER NOT NULL,
    `recuPDF` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Utilisateur` ADD CONSTRAINT `Utilisateur_entrepriseId_fkey` FOREIGN KEY (`entrepriseId`) REFERENCES `Entreprise`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employe` ADD CONSTRAINT `Employe_entrepriseId_fkey` FOREIGN KEY (`entrepriseId`) REFERENCES `Entreprise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CyclePaie` ADD CONSTRAINT `CyclePaie_entrepriseId_fkey` FOREIGN KEY (`entrepriseId`) REFERENCES `Entreprise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bulletin` ADD CONSTRAINT `Bulletin_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bulletin` ADD CONSTRAINT `Bulletin_cyclePaieId_fkey` FOREIGN KEY (`cyclePaieId`) REFERENCES `CyclePaie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paiement` ADD CONSTRAINT `Paiement_bulletinId_fkey` FOREIGN KEY (`bulletinId`) REFERENCES `Bulletin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
