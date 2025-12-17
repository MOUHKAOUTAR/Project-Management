-- Script SQL pour mettre à jour les colonnes des tables projects et tasks
-- Exécutez ce script dans votre base de données PostgreSQL

-- ========== TABLE PROJECTS ==========
-- Augmenter la taille de la colonne title à 500 caractères
ALTER TABLE projects ALTER COLUMN title TYPE VARCHAR(500);

-- Augmenter la taille de la colonne description à 2000 caractères
ALTER TABLE projects ALTER COLUMN description TYPE VARCHAR(2000);

-- ========== TABLE TASKS ==========
-- Augmenter la taille de la colonne title à 500 caractères
ALTER TABLE tasks ALTER COLUMN title TYPE VARCHAR(500);

-- Augmenter la taille de la colonne description à 2000 caractères
ALTER TABLE tasks ALTER COLUMN description TYPE VARCHAR(2000);

